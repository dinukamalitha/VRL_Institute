'use client';

import { Card, CardContent, Typography, Box } from '@mui/material';
import Image from 'next/image';
import {PublicationsCardProps} from "@/types/components";

export default function PublicationsCard({ category, image, count, width=100, height=100 }: PublicationsCardProps) {
    return (
        <Card
            sx={{
                textAlign: 'center',
                borderRadius: 3,
                p: 2,
                transition: '0.3s ease',
                height: '100%',
                border: '1px solid #e0e0e0',
                '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: '0 6px 16px rgba(0,0,0,0.1)',
                },
            }}
        >
            <CardContent>
                {/* Category Title */}
                <Typography
                    variant="h6"
                    sx={{
                        fontWeight: 'bold',
                        color: '#333',
                        mb: 2,
                        textTransform: 'uppercase',
                        letterSpacing: '0.8px',
                    }}
                >
                    {category}
                </Typography>

                {/* Image */}
                <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
                    <Image
                        src={image}
                        alt={category}
                        width={width}
                        height={height}
                        style={{
                            borderRadius: '12px',
                            objectFit: 'cover',
                        }}
                    />
                </Box>

                {/* Count */}
                <Typography
                    variant="h4"
                    sx={{
                        fontWeight: 'bold',
                        color: 'primary.main',
                    }}
                >
                    {count}
                </Typography>

                <Typography variant="body2" color="text.secondary">
                    Publications
                </Typography>
            </CardContent>
        </Card>
    );
}
