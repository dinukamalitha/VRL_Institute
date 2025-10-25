'use client';

import { Card, CardContent, Typography, Box } from '@mui/material';

interface SupportStaffCardProps {
    name: string;
    image: string; // image URL
    role?: string;
    description: string;
}

export default function SupportStaffCard({ name, image, role, description }: SupportStaffCardProps) {
    return (
        <Card
            sx={{
                display: 'flex',
                flexDirection: { xs: 'column', sm: 'row' },
                gap: 2,
                p: 2,
                borderRadius: 3,
                boxShadow: 6,
                transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: '0 8px 20px rgba(0,0,0,0.15)',
                },
            }}
        >
            {/* Left Side: Image + Name */}
            <Box
                sx={{
                    width: { xs: '100%', sm: 120 },
                    flexShrink: 0,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    textAlign: 'center',
                }}
            >
                <Box
                    sx={{
                        width: 100,
                        height: 100,
                        borderRadius: '50%',
                        overflow: 'hidden',
                        mb: 1.5,
                        backgroundImage: `url(${image})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                />
                <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: '#333' }}>
                    {name}
                </Typography>
                {role && (
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        {role}
                    </Typography>
                )}
            </Box>

            {/* Right Side: Description */}
            <CardContent sx={{ p: 0, flex: 1 }}>
                <Typography variant="body2" sx={{ color: '#555', lineHeight: 1.6 }}>
                    {description}
                </Typography>
            </CardContent>
        </Card>
    );
}
