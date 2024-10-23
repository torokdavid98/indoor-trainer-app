#!/bin/bash -e

scriptdir=$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" &>/dev/null && pwd)

if [[ ! $(command -v mysql) ]]; then
    case $OSTYPE in
    "cygwin" | "msys")
        echo "ERROR: Command mysql does not exist. Install it with 'choco install mysql-cli."
        ;;
    "darwin"*)
        echo "ERROR: Command mysql does not exist. Install it with 'brew install mysql-client."
        ;;
    *)
        echo "ERROR: Command mysql does not exist. Install it with your package manager (https://command-not-found.com/mysql)."
        ;;
    esac
    exit 127
fi

if [[ -z "$DB_HOST" || -z "$DB_USER" || -z "$DB_NAME" ]]; then
    echo "WARN: DB_HOST, DB_USER or DB_NAME variable is not set. Falling back to .env"
    source $scriptdir/../.env
fi

if [[ -n "$DB_PASS" ]]; then
    DB_PASSFLAG="-p$DB_PASS"
else
    echo "WARN: DB_PASS variable is empty string."
    DB_PASSFLAG=""
fi

if [[ -n "$DB_PORT" ]]; then
    DB_PORTFLAG="--port $DB_PORT --protocol tcp"
else
    echo "WARN: Using port 3306."
    DB_PORTFLAG=""
fi

mysqlcmd="mysql -h$DB_HOST $DB_PORTFLAG -u$DB_USER $DB_PASSFLAG $DB_NAME"
migratedb="_migrations"

# LOAD DUMP IF THERE ARE NO TABLES
# if [[ -z "$($mysqlcmd -e 'SHOW TABLES;' -sN)" ]]; then
#     echo "INFO: Loading base dump."
#     $mysqlcmd -e"SOURCE $scriptdir/e2e-dump.sql;"
#     echo "INFO: Successfully loaded base dump."
# fi

# CREATE MIGRATIONS DB IF IT DOESN'T EXIST
if [[ -z "$($mysqlcmd -e 'SHOW TABLES;' -sN | grep $migratedb)" ]]; then
    $mysqlcmd -e "CREATE TABLE $migratedb ( filename VARCHAR(120) );"
fi

migrated=$($mysqlcmd -e "SELECT filename FROM $migratedb;" -sN)

# MIGRATE FILES
migrationfiles=$(find $scriptdir -name '*.sql' -type f | sort)
for file in $migrationfiles; do
    filename=$(basename $file)
    if [[ "$migrated" != *"$filename"* ]]; then
        echo "INFO: Started migrating $filename."
        $mysqlcmd -e"SOURCE $file;"
        $mysqlcmd -e"INSERT INTO $migratedb (filename) VALUES ('$filename')"
        echo "INFO: Successfully migrated $filename."
    fi
done

echo "INFO: Everything has been migrated."
