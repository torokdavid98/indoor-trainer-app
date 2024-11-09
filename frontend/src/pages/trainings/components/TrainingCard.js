import React, { useState } from 'react';
import {
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    CardHeader,
    CardMedia,
    Grid,
    IconButton,
    Typography,
} from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { MODAL_TYPE, useModals } from '../../../hooks/useModal';

const TrainingCard = ({ training, reloadData, updateCard }) => {
    const { showModal } = useModals();
    const [isSaved, setIsSaved] = useState(training?.saved_training);

    const handleFavoriteToggle = async () => {
        await updateCard(training);
        setIsSaved((prev) => !prev);
    };

    return (
        <Grid item xs={12} sm={6} md={4} lg={3}>
            <Card
                style={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                }}
            >
                <CardHeader
                    title={
                        <Typography
                            variant="subtitle1"
                            sx={{
                                display: '-webkit-box',
                                WebkitLineClamp: 1,
                                WebkitBoxOrient: 'vertical',
                                overflow: 'hidden',
                            }}
                        >
                            {training.name}
                        </Typography>
                    }
                />
                <Box position="relative">
                    <CardMedia
                        image="/assets/cover.jpg"
                        title="training"
                        style={{
                            height: '200px',
                            width: '100%',
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            backgroundColor: 'rgba(0, 0, 0, .1)',
                        }}
                    />
                </Box>
                <CardContent
                    style={{
                        flexGrow: 1,
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                        paddingBottom: 0,
                        marginBottom: '16px',
                    }}
                >
                    <Typography variant="body1" color="textSecondary">
                        {training.description}
                    </Typography>
                </CardContent>
                <CardActions disableSpacing>
                    <Button
                        fullWidth
                        onClick={() => {
                            showModal(MODAL_TYPE.TRAINING_DETAILS, {
                                training,
                                reloadData,
                            });
                        }}
                    >
                        Show details
                    </Button>
                    <Grid item xs={2} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <IconButton fullWidth onClick={handleFavoriteToggle}>
                            {isSaved ? <FavoriteIcon color="error" /> : <FavoriteBorderIcon />}
                        </IconButton>
                    </Grid>
                </CardActions>
            </Card>
        </Grid>
    );
};

export default TrainingCard;
