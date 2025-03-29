import { Box, LinearProgress, Paper, Typography } from '@mui/material';
import React from 'react';

const DetailsBox = () => {
    const totalDuration = 60; // Total workout time in minutes
    const elapsedTime = 25; // Mock elapsed time (currently in the second section)

    // Define workout sections with expected power output
    const sections = [
        { name: 'Warm-up', duration: 10, watts: 120 },
        { name: 'Main Set', duration: 40, watts: 290 },
        { name: 'Cool-down', duration: 10, watts: 100 },
    ];

    // Determine the current section
    let accumulatedTime = 0;
    let currentSectionIndex = 0;
    for (let i = 0; i < sections.length; i++) {
        accumulatedTime += sections[i].duration;
        if (elapsedTime < accumulatedTime) {
            currentSectionIndex = i;
            break;
        }
    }

    return (
        <Paper elevation={2} sx={{ padding: 2, marginBottom: 2 }}>
            <Typography variant="h6">Workout Progress</Typography>

            <Box sx={{ marginTop: 2 }}>
                {sections.map((section, index) => {
                    const sectionElapsed = Math.max(
                        0,
                        elapsedTime - (accumulatedTime - section.duration)
                    );
                    const progress =
                        index < currentSectionIndex
                            ? 100
                            : index === currentSectionIndex
                            ? (sectionElapsed / section.duration) * 100
                            : 0;

                    return (
                        <Box key={section.name} sx={{ marginBottom: 1 }}>
                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                }}
                            >
                                <Typography
                                    variant="body2"
                                    fontWeight={index === currentSectionIndex ? 'bold' : 'normal'}
                                >
                                    {section.name} ({section.duration} min)
                                </Typography>
                                <Typography variant="body2" sx={{ color: 'grey.700' }}>
                                    {section.watts} W
                                </Typography>
                            </Box>
                            <LinearProgress
                                variant="determinate"
                                value={progress}
                                sx={{
                                    height: 8,
                                    backgroundColor: index < currentSectionIndex ? '#ccc' : '#eee',
                                    '& .MuiLinearProgress-bar': {
                                        backgroundColor:
                                            index === currentSectionIndex
                                                ? 'primary.main'
                                                : 'grey.500',
                                    },
                                }}
                            />
                        </Box>
                    );
                })}
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: 2 }}>
                <Typography variant="body2">Elapsed: {elapsedTime} min</Typography>
                <Typography variant="body2">
                    Remaining: {totalDuration - elapsedTime} min
                </Typography>
            </Box>
        </Paper>
    );
};

export default DetailsBox;
