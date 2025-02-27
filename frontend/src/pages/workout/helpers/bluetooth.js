export function onIndoorBikeDataChanged(event) {
    const processingPipeline = {
        processors: [],
        process(data) {
            return this.processors.reduce((currentData, processor) => {
                return processor.process(currentData);
            }, data);
        },
    };

    const characteristic = event.target;
    if (characteristic.value) {
        let indoorBikeData = this.parseIndoorBikeData(characteristic.value);

        // Apply all processors that augment the data.
        indoorBikeData = this.processingPipeline.processors.push({
            process: (data) => {
                // Modify data as needed
                return data;
            },
        });
        indoorBikeData;

        this.indoorBikeDataSubject.next(indoorBikeData);
    }
}

// export function onIndoorBikeDataChanged(event) {
//     const characteristic = event.target;
//     if (characteristic.value) {
//         let indoorBikeData = parseIndoorBikeData(characteristic.value);

//         // Apply all processors that augment the data.
//         indoorBikeData = processingPipeline.process(indoorBikeData);

//         // // Apply a new grade to the fitness machine
//         // if (lastGrade !== indoorBikeData.calculatedGrade) {
//         //     setIndoorBikeSimulationParameters(0, indoorBikeData.calculatedGrade, 0, 0);
//         //     lastGrade = indoorBikeData.calculatedGrade;
//         // }

//         indoorBikeDataSubject(indoorBikeData);
//     }
// }

export const parseIndoorBikeData = (data) => {
    const flags = data.getUint16(0, /*littleEndian=*/ true);

    const moreDataPresent = flags & 0x0001;
    const averageSpeedPresent = flags & 0x0002;
    const instantaneousCadencePresent = flags & 0x0004;
    const averageCadencePresent = flags & 0x0008;
    const nativeTotalDistancePresent = flags & 0x0010;
    const nativeResistanceLevelPresent = flags & 0x0020;
    const instantaneousPowerPresent = flags & 0x0040;
    const averagePowerPresent = flags & 0x0080;
    const expendedEnergyPresent = flags & 0x0100;
    const heartRatePresent = flags & 0x0200;
    const metabolicEquivalentPresent = flags & 0x0400;
    const nativeElapsedTimePresent = flags & 0x0800;
    const remainingTimePresent = flags & 0x1000;

    const result = {
        instantaneousSpeedPresent: false,
        instantaneousSpeed: 0,
        averageSpeedPresent: false,
        averageSpeed: 0,
        instantaneousCadencePresent: false,
        instantaneousCadence: 0,
        averageCadencePresent: false,
        averageCadence: 0,
        instantaneousPowerPresent: false,
        instantaneousPower: 0,
        averagePowerPresent: false,
        averagePower: 0,
        expendedEnergyPresent: false,
        totalEnergy: 0,
        energyPerHour: 0,
        energyPerMinute: 0,
        heartRatePresent: false,
        heartRate: 0,
        metabolicEquivalentPresent: false,
        metabolicEquivalent: 0,

        // KICKR doesn't send it
        nativeElapsedTimePresent: false,
        nativeElapsedTime: 0,
        nativeResistanceLevelPresent: false,
        nativeResistanceLevel: 0,
        nativeTotalDistancePresent: false,
        nativeTotalDistance: 0, // in m

        // Values calculated by this app
        calculatedElapsedTime: 0,
        calculatedTotalDistance: 0, // m
        calculatedGrade: 0, // %
    };

    let index = 2;

    if (!moreDataPresent) {
        result.instantaneousSpeedPresent = true;
        result.instantaneousSpeed = data.getUint16(index, /*littleEndian=*/ true) / 100;
        index += 2;
    }

    if (averageSpeedPresent) {
        result.averageSpeedPresent = true;
        result.averageSpeed = data.getUint16(index, /*littleEndian=*/ true) / 100;
        index += 2;
    }

    if (instantaneousCadencePresent) {
        result.instantaneousCadencePresent = true;
        result.instantaneousCadence = data.getUint16(index, /*littleEndian=*/ true) / 2;
        index += 2;
    }

    if (averageCadencePresent) {
        result.averageCadencePresent = true;
        result.averageCadence = data.getUint16(index, /*littleEndian=*/ true) / 2;
        index += 2;
    }

    if (nativeTotalDistancePresent) {
        result.nativeTotalDistancePresent = true;
        result.nativeTotalDistance =
            (data.getUint8(index + 2) * 256 + data.getUint8(index + 1)) * 256 +
            data.getUint8(index);
        index += 3;
    }

    if (nativeResistanceLevelPresent) {
        result.nativeResistanceLevelPresent = true;
        result.nativeResistanceLevel = data.getInt16(index, /*littleEndian=*/ true);
        index += 2;
    }

    if (instantaneousPowerPresent) {
        result.instantaneousPowerPresent = true;
        result.instantaneousPower = data.getInt16(index, /*littleEndian=*/ true);
        index += 2;
    }

    if (averagePowerPresent) {
        result.averagePowerPresent = true;
        result.averagePower = data.getInt16(index, /*littleEndian=*/ true);
        index += 2;
    }

    if (expendedEnergyPresent) {
        result.expendedEnergyPresent = true;
        result.totalEnergy = data.getUint16(index, /*littleEndian=*/ true);
        index += 2;
        result.energyPerHour = data.getUint16(index, /*littleEndian=*/ true);
        index += 2;
        result.energyPerMinute = data.getUint8(index);
        index += 1;
    }

    if (heartRatePresent) {
        result.heartRatePresent = true;
        result.heartRate = data.getUint8(index);
        index += 1;
    }

    if (metabolicEquivalentPresent) {
        result.metabolicEquivalentPresent = true;
        result.metabolicEquivalent = data.getUint8(index) / 10;
        index += 1;
    }

    if (nativeElapsedTimePresent) {
        result.nativeElapsedTimePresent = true;
        result.nativeElapsedTime = data.getUint16(index, /*littleEndian=*/ true);
        index += 2;
    }

    if (remainingTimePresent) {
        index += 2;
    }

    return result;
};

// connect to bluetooth device
export async function connect() {
    const options = {
        acceptAllDevices: false,
        filters: [{ services: ['fitness_machine'] }],
    };

    let service = null;
    let indoorBikeDataCharacteristic = null;
    let fitnessMachineControlPointCharacteristic = null;
    let supportedPowerRange = null;

    try {
        const device = await navigator.bluetooth.requestDevice(options);
        const server = await device.gatt?.connect();
        service = await server?.getPrimaryService('fitness_machine');

        indoorBikeDataCharacteristic = await service?.getCharacteristic('indoor_bike_data');
        fitnessMachineControlPointCharacteristic = await service?.getCharacteristic(
            'fitness_machine_control_point'
        );
        const supportedPowerRangeCharacteristic = await service?.getCharacteristic(
            'supported_power_range'
        );
        const supportedPowerRangeValue = await supportedPowerRangeCharacteristic?.readValue();
        if (supportedPowerRangeValue) {
            supportedPowerRange = {
                minimum: supportedPowerRangeValue.getUint16(0, /*littleEndian=*/ true),
                maximum: supportedPowerRangeValue.getUint16(2, /*littleEndian=*/ true),
            };
        }

        fitnessMachineControlPointCharacteristic?.addEventListener(
            'characteristicvaluechanged',
            (event) => this.onControlPointChanged(event)
        );
        await fitnessMachineControlPointCharacteristic?.startNotifications();

        //  await startNotifications(fitnessMachineControlPointCharacteristic);
    } catch (error) {
        console.log('Error connecting to device', error);
    }
    return {
        service,
        indoorBikeDataCharacteristic,
        fitnessMachineControlPointCharacteristic,
        supportedPowerRange,
    };
}

// disconnect from the connected device
export async function disconnect(device) {
    try {
        await device?.gatt?.disconnect();
    } catch (error) {
        console.log('Error disconnecting from device', error);
    }
}

export async function startNotifications() {
    this.indoorBikeDataCharacteristic?.addEventListener('characteristicvaluechanged', (event) =>
        this.onIndoorBikeDataChanged(event)
    );
    await this.indoorBikeDataCharacteristic?.startNotifications();
}
