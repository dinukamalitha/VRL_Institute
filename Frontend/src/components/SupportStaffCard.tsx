'use client';

import { useState } from 'react';
import { Box, Typography, Card, CardContent } from '@mui/material';
import { KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material';

export interface SupportStaff {
    name: string;
    role: string;
    photo?: string;
    description?: string;
}

interface SupportStaffCardProps {
    staff: SupportStaff;
}

export default function SupportStaffCard({ staff }: SupportStaffCardProps) {
    const [expanded, setExpanded] = useState(false);

    return (
        <Card
            onClick={() => setExpanded(!expanded)}
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                width: 300,
                height: expanded ? 450 : 300,
                transition: 'all 0.3s ease',
                cursor: 'pointer',
                borderRadius: 3,
                '&:hover': {
                    boxShadow: 6,
                    transform: 'translateY(-6px)',
                },
            }}
        >
            {/* Image */}
            <Box
                sx={{
                    height: 200,
                    width: 150,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: 'grey.100',
                    backgroundImage: staff.photo ? `url(${staff.photo})` : 'none',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    borderTopLeftRadius: 12,
                    borderTopRightRadius: 12,
                    mt:2
                }}
            >
                {!staff.photo && (
                    <Typography variant="h4" sx={{ color: 'grey.500' }}>
                        👤
                    </Typography>
                )}
            </Box>

            {/* Content */}
            <CardContent
                sx={{
                    flexGrow: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    p: 1.5,
                    textAlign: 'center',
                }}
            >
                <Typography
                    variant="subtitle1"
                    component="h3"
                    sx={{
                        fontWeight: 600,
                        fontSize: '1rem',
                        mb: 0.5,
                    }}
                >
                    {staff.name}
                </Typography>

                <Typography
                    variant="caption"
                    sx={{
                        color: 'text.secondary',
                        mb: 0.5,
                    }}
                >
                    {staff.role}
                </Typography>

                {/* Expand arrow */}
                <Box sx={{ display: 'flex', justifyContent: 'center', mb: 0.5 }}>
                    {expanded ? (
                        <KeyboardArrowUp color="primary" fontSize="small" />
                    ) : (
                        <KeyboardArrowDown color="primary" fontSize="small" />
                    )}
                </Box>

                {/* Description */}
                {expanded && staff.description && (
                    <Box
                        sx={{
                            mt: 0.5,
                            p: 1,
                            maxHeight: 100,
                            overflowY: 'auto',
                            width: '100%',
                            border: '1px solid rgba(0,0,0,0.1)',
                            borderRadius: 1,
                            backgroundColor: 'rgba(0,0,0,0.02)',
                            textAlign: 'justify',
                            '@keyframes fadeIn': {
                                '0%': { opacity: 0, transform: 'translateY(-8px)' },
                                '100%': { opacity: 1, transform: 'translateY(0)' },
                            },
                            animation: 'fadeIn 0.25s ease-in-out',
                            '&::-webkit-scrollbar': { width: '6px' },
                            '&::-webkit-scrollbar-thumb': {
                                background: 'rgba(0,0,0,0.2)',
                                borderRadius: '4px',
                            },
                            '&::-webkit-scrollbar-thumb:hover': {
                                background: 'rgba(0,0,0,0.3)',
                            },
                        }}
                    >
                        <Typography
                            variant="body2"
                            sx={{
                                color: 'text.secondary',
                                fontSize: '0.75rem',
                                lineHeight: 1.5,
                                whiteSpace: 'pre-wrap',
                            }}
                        >
                            {staff.description}
                        </Typography>
                    </Box>
                )}
            </CardContent>
        </Card>
    );
}
