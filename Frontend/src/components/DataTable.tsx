'use client'

import React from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Box,
  Typography,
  TablePagination,
} from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'

interface Column {
  id: string
  label: string
  minWidth?: number
  align?: 'right' | 'left' | 'center'
  format?: (value: any) => string | React.ReactNode
}

interface DataTableProps {
  columns: Column[]
  data: any[]
  title?: string
  onEdit?: (row: any) => void
  onDelete?: (row: any) => void
  showActions?: boolean
  actionsColumn?: {
    label: string
    actions: {
      icon: React.ReactNode
      label: string
      onClick: (row: any) => void
      color?: string
    }[]
  }
  filteredData?: any[]
  loading: boolean
}

export default function DataTable({
  columns,
  data,
  title,
  onEdit,
  onDelete,
  showActions = true,
  actionsColumn,
  filteredData
}: DataTableProps) {
  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(10)

  // Use provided filtered data or fall back to original data
  const displayData = filteredData || data

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }

  const paginatedData = displayData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      {/* Header */}
      {title && (
        <Box sx={{ p: 2, borderBottom: '1px solid #e0e0e0' }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#333' }}>
            {title}
          </Typography>
        </Box>
      )}



      {/* Table */}
      <TableContainer sx={{ maxHeight: 600 }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                  sx={{
                    backgroundColor: '#1976d2',
                    fontWeight: 'bold',
                    color: 'white',
                    borderBottom: '2px solid #1565c0',
                    '&:hover': {
                      backgroundColor: '#1565c0',
                    },
                    transition: 'background-color 0.2s ease',
                  }}
                >
                  {column.label}
                </TableCell>
              ))}
              {showActions && (
                <TableCell
                  align="center"
                  sx={{
                    backgroundColor: '#1976d2',
                    fontWeight: 'bold',
                    color: 'white',
                    borderBottom: '2px solid #1565c0',
                    minWidth: 120,
                    '&:hover': {
                      backgroundColor: '#1565c0',
                    },
                    transition: 'background-color 0.2s ease',
                  }}
                >
                  {actionsColumn?.label || 'Actions'}
                </TableCell>
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedData.length > 0 ? (
              paginatedData.map((row, index) => (
                <TableRow
                  hover
                  key={row.id || index}
                  sx={{
                    height: 48,
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    '&:nth-of-type(odd)': {
                      backgroundColor: '#fafafa',
                    },
                    '&:hover': {
                      backgroundColor: '#e3f2fd',
                      transform: 'translateY(-1px)',
                      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                    },
                  }}
                >
                  {columns.map((column) => {
                    const value = row[column.id]
                    return (
                      <TableCell 
                        key={column.id} 
                        align={column.align}
                        sx={{ 
                          py: 1,
                          fontSize: '0.875rem'
                        }}
                      >
                        {column.format ? column.format(value) : value}
                      </TableCell>
                    )
                  })}
                                     {showActions && (
                     <TableCell 
                       align="center"
                       sx={{ 
                         py: 1,
                         fontSize: '0.875rem'
                       }}
                     >
                       <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center' }}>
                        {actionsColumn ? (
                          actionsColumn.actions.map((action, actionIndex) => (
                            <IconButton
                              key={actionIndex}
                              size="small"
                              onClick={() => action.onClick(row)}
                              sx={{
                                color: action.color || '#666',
                                padding: 0.5,
                                '&:hover': {
                                  backgroundColor: `${action.color || '#666'}20`,
                                },
                              }}
                              title={action.label}
                            >
                              {action.icon}
                            </IconButton>
                          ))
                        ) : (
                                                     <>
                             {onEdit && (
                               <IconButton
                                 size="small"
                                 onClick={() => onEdit(row)}
                                 sx={{
                                   color: '#E91E63',
                                   padding: 0.5,
                                   '&:hover': {
                                     backgroundColor: 'rgba(233, 30, 99, 0.1)',
                                   },
                                 }}
                                 title="Edit"
                               >
                                 <EditIcon fontSize="small" />
                               </IconButton>
                             )}
                             {onDelete && (
                               <IconButton
                                 size="small"
                                 onClick={() => onDelete(row)}
                                 sx={{
                                   color: '#f44336',
                                   padding: 0.5,
                                   '&:hover': {
                                     backgroundColor: 'rgba(244, 67, 54, 0.1)',
                                   },
                                 }}
                                 title="Delete"
                               >
                                 <DeleteIcon fontSize="small" />
                               </IconButton>
                             )}
                           </>
                        )}
                      </Box>
                    </TableCell>
                  )}
                </TableRow>
              ))
            ) : (
              <TableRow>
                                 <TableCell colSpan={columns.length + (showActions ? 1 : 0)} align="center">
                   <Typography variant="body2" color="textSecondary" sx={{ py: 4 }}>
                     No data available.
                   </Typography>
                 </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination */}
      <TablePagination
        rowsPerPageOptions={[5, 10, 25, 50]}
        component="div"
        count={displayData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        sx={{
          borderTop: '1px solid #e0e0e0',
          '& .MuiTablePagination-selectLabel, & .MuiTablePagination-displayedRows': {
            color: '#666',
          },
        }}
      />
    </Paper>
  )
} 