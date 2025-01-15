import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Card,
  CardContent,
  IconButton,
  Tooltip,
  Fade,
  Stack,
  Chip,
  CircularProgress,
  FormControl,
  Select,
  MenuItem
} from '@mui/material';
import {
  Add as AddIcon,
  Delete as DeleteIcon,
  Info as InfoIcon
} from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';
import { Edit as EditIcon, Close as CloseIcon } from '@mui/icons-material';
import { Dialog, DialogTitle, DialogContent, DialogContentText } from '@mui/material';

const GPAForm = ({ onUpdate, decimalPlaces, onDecimalChange }) => {
    const theme = useTheme();
    const [loading, setLoading] = useState(false);
    const [courseCount, setCourseCount] = useState(1);
    const [formData, setFormData] = useState({
        name: '',
        grade: '',
        credit: ''
    });
    const [courses, setCourses] = useState([]);

    // Add new state
    const [editingIndex, setEditingIndex] = useState(null);

    // Add state for dialog
const [openInfo, setOpenInfo] = useState(false);

// Add handlers
const handleInfoOpen = () => setOpenInfo(true);
const handleInfoClose = () => setOpenInfo(false);

   const handleEdit = (index) => {
    // Validate index
    if (index < 0 || index >= courses.length) return;
    
    // Set editing state
    setEditingIndex(index);
    
    // Load exact course data for editing
    const courseToEdit = courses[index];
    setFormData({
        name: courseToEdit.name,
        grade: courseToEdit.grade.toString(), // Convert to string for input
        credit: courseToEdit.credit.toString() // Convert to string for input
    });
}; 
  

  const getGradeColor = (grade) => {
    return grade >= 75 ? 'success' : 'primary';
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    
    if (name === 'grade') {
      const numValue = parseInt(value);
      if (numValue < 0 || numValue > 100) return;
    }

    if (name === 'credit') {
      const numValue = parseInt(value);
      if (numValue < 1 || numValue > 60) return;
    }

    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
};
const handleDecimalPlaceChange = (e) => {
    const newDecimals = Number(e.target.value);
    onDecimalChange(newDecimals);
    calculateGPA(courses, newDecimals);
  };

  const calculateGPA = (currentCourses, decimals) => {
    const { gradePoints, credits } = currentCourses.reduce((acc, course) => ({
      gradePoints: acc.gradePoints + (Number(course.grade) * Number(course.credit)),
      credits: acc.credits + Number(course.credit)
    }), { gradePoints: 0, credits: 0 });
    
    onUpdate(gradePoints, credits, decimals);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);
  
    const newCourseData = {
      name: formData.name || `Course ${courseCount}`,
      grade: Number(formData.grade),
      credit: Number(formData.credit)
    };
  
    let updatedCourses;
    if (editingIndex !== null) {
      // Replace the edited course
      updatedCourses = [...courses];
      updatedCourses[editingIndex] = newCourseData;
    } else {
      // Add new course
      updatedCourses = [...courses, newCourseData];
      setCourseCount(prev => prev + 1);
    }
  
    // Update courses first, then calculate GPA
    setCourses(updatedCourses);
    calculateGPA(updatedCourses);
    
    // Reset form state
    setFormData({ name: '', grade: '', credit: '' });
    setEditingIndex(null);
    setLoading(false);
  };

  // Add cancel edit handler
  const handleCancelEdit = () => {
    setEditingIndex(null);
    setFormData({ name: '', grade: '', credit: '' });
  };

  const handleDelete = (index) => {
    setCourses(prev => {
      const newCourses = prev.filter((_, i) => i !== index);
      // Rename courses after deletion to maintain sequence
      const renamedCourses = newCourses.map((course, i) => ({
        ...course,
        name: course.name.startsWith('Course ') ? `Course ${i + 1}` : course.name
      }));
      calculateGPA(renamedCourses);
      return renamedCourses;
    });
    setCourseCount(courses.length); // Reset counter to match remaining courses
  };


  return (
    <Box sx={{ position: 'relative' }}>

      <Paper 
        component="form" 
        onSubmit={handleSubmit}
        sx={{ 
          p: 3, 
          mb: 4,
          borderRadius: 2,
          background: theme.palette.background.paper,
          transition: 'all 0.3s ease',
          '&:hover': {
            boxShadow: theme.shadows[4]
          }
        }}
      >
                <Stack 
          direction={{ xs: 'column', md: 'row' }} 
          spacing={3} 
          alignItems="flex-start"
          sx={{ width: '100%' }}
        >
          <TextField
            fullWidth
            label="Course Name (Optional)"
            name="name"
            value={formData.name}
            onChange={handleChange}
            variant="outlined"
            helperText="Defaults to Course 1..."
            sx={{ flex: 1 }}
          />
          <TextField
            fullWidth
            label="Grade (%)"
            name="grade"
            type="number"
            value={formData.grade}
            onChange={handleChange}
            required
            variant="outlined"
            inputProps={{ min: 0, max: 100, step: 1 }}
            helperText="Enter grade (0-100)"
            sx={{ flex: 1 }}
          />
          <TextField
            fullWidth
            label="Credits"
            name="credit"
            type="number"
            value={formData.credit}
            onChange={handleChange}
            required
            variant="outlined"
            inputProps={{ min: 1, max: 60 }}
            helperText="Enter credits (1-60)"
            sx={{ flex: 1 }}
          />
          <Box sx={{ display: 'flex', gap: 1, height: '56px', mt: 0 }}>
            <Tooltip title={editingIndex !== null ? "Update Course" : "Add Course"}>
              <Button
                type="submit"
                variant="contained"
                color={editingIndex !== null ? "success" : "primary"}
                disabled={loading}
                sx={{
                  height: '56px',
                  minWidth: editingIndex !== null ? '120px' : '56px',
                  borderRadius: '8px',
                  transition: 'all 0.3s ease',
                  backgroundColor: editingIndex !== null ? '#2e7d32' : '#1976d2',
                  color: '#ffffff',
                  '&:hover': {
                    backgroundColor: editingIndex !== null ? '#1b5e20' : '#1565c0',
                    transform: 'scale(1.05)'
                  },
                  '& .MuiSvgIcon-root': {
                    color: '#ffffff'
                  }
                }}
              >
                {loading ? (
                  <CircularProgress size={24} color="inherit" />
                ) : editingIndex !== null ? (
                  'Save Changes'
                ) : (
                  <AddIcon sx={{ color: '#ffffff' }} />
                )}
              </Button>
            </Tooltip>
            {editingIndex !== null && (
              <Tooltip title="Cancel Editing">
                <Button
                  onClick={handleCancelEdit}
                  variant="outlined"
                  color="error"
                  sx={{
                    height: '56px',
                    minWidth: '56px',
                    borderRadius: '8px',
                    transition: 'all 0.3s ease',
                    borderColor: '#d32f2f',
                    color: '#d32f2f',
                    '&:hover': {
                      backgroundColor: '#d32f2f',
                      color: '#ffffff',
                      transform: 'scale(1.05)'
                    }
                  }}
                >
                  <CloseIcon />
                </Button>
              </Tooltip>
            )}
          </Box>
        </Stack>
      </Paper>

      {courses.length > 0 && (
        <Paper sx={{ p: 2, mb: 2, borderRadius: 2, background: theme.palette.background.paper }}>
          <Stack direction="row" spacing={2} alignItems="center">
            <Typography variant="body2" color="text.secondary">
              Round GPA to:
            </Typography>
            <FormControl size="small" sx={{ minWidth: 120 }}>
            <Select
  value={decimalPlaces}
  onChange={handleDecimalPlaceChange}
  displayEmpty
  sx={{ height: '32px' }}
>
  <MenuItem value={0}>No Decimals</MenuItem>
  <MenuItem value={1}>One Decimal</MenuItem>
  <MenuItem value={2}>Two Decimals</MenuItem>
  <MenuItem value={3}>Three Decimals</MenuItem>
  <MenuItem value={4}>Four Decimals</MenuItem>
</Select>
            </FormControl>
          </Stack>
        </Paper>
      )}

      <Fade in={courses.length > 0}>
                <TableContainer 
          component={Paper}
          sx={{ 
            mb: 4,
            borderRadius: 2,
            overflow: 'auto',
            WebkitOverflowScrolling: 'touch',
            '&::-webkit-scrollbar': {
              height: '8px'
            },
            '&::-webkit-scrollbar-thumb': {
              borderRadius: '4px',
              backgroundColor: 'rgba(0,0,0,0.2)'
            }
          }}
        >
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell sx={{ minWidth: '120px' }}>Course</TableCell>
                <TableCell align="right" sx={{ minWidth: '100px' }}>Grade (%)</TableCell>
                <TableCell align="right" sx={{ minWidth: '80px' }}>Credits</TableCell>
                <TableCell align="right" sx={{ minWidth: '100px' }}>Grade Points</TableCell>
                <TableCell align="right" sx={{ minWidth: '100px' }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {courses.map((course, index) => (
                <TableRow 
                  key={index}
                  sx={{
                    transition: 'all 0.2s ease',
                    '&:hover': {
                      backgroundColor: theme.palette.action.hover
                    }
                  }}
                >
                  <TableCell sx={{ py: 1 }}>{course.name}</TableCell>
                  <TableCell align="right" sx={{ py: 1 }}>
                    <Chip 
                      label={`${course.grade}%`}
                      color={getGradeColor(course.grade)}
                      size="small"
                      sx={{ fontSize: '0.75rem' }}
                    />
                  </TableCell>
                  <TableCell align="right" sx={{ py: 1 }}>{course.credit}</TableCell>
                  <TableCell align="right" sx={{ py: 1 }}>
                    {(course.grade * course.credit).toFixed(2)}
                  </TableCell>
                  <TableCell align="right" sx={{ py: 1 }}>
                    <Stack 
                      direction="row" 
                      spacing={0.5} 
                      justifyContent="flex-end"
                    >
                      <IconButton 
                        size="small"
                        onClick={() => handleEdit(index)}
                        sx={{
                          padding: '4px',
                          color: theme.palette.primary.main,
                          '&:hover': { transform: 'scale(1.1)' }
                        }}
                      >
                        <EditIcon fontSize="small" />
                      </IconButton>
                      <IconButton 
                        size="small"
                        onClick={() => handleDelete(index)}
                        sx={{
                          padding: '4px',
                          color: theme.palette.error.main,
                          '&:hover': { transform: 'scale(1.1)' }
                        }}
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </Stack>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Fade>

      <Box sx={{ position: 'fixed', bottom: 24, right: 24 }}>
  <Tooltip title="GPA Calculation Info">
    <IconButton
      onClick={handleInfoOpen}
      color="primary"
      sx={{
        bgcolor: theme.palette.background.paper,
        boxShadow: theme.shadows[3],
        '&:hover': {
          bgcolor: theme.palette.background.paper,
          transform: 'scale(1.1)'
        }
      }}
    >
      <InfoIcon />
    </IconButton>
  </Tooltip>
  <Dialog open={openInfo} onClose={handleInfoClose}>
    <DialogTitle>GPA Calculation Guide</DialogTitle>
    <DialogContent>
      <DialogContentText>
        <Typography paragraph>
          Your GPA is calculated using the following formula:
        </Typography>
        <Typography paragraph>
          GPA = Total Grade Points / Total Credits
        </Typography>
        <Typography paragraph>
          Grade Points = Course Grade × Course Credits
        </Typography>
        <Typography variant="subtitle2" color="textSecondary">
          Grade Scale:
        </Typography>
        <Typography>
          75-100%: First Class (Green)
          70-74%: Second Class Division I (Blue)
          60-69%: Second Class Division II (Orange)
          50-59%: Third Class (Light Blue)
          0-49%: Fail (Red)
        </Typography>
      </DialogContentText>
    </DialogContent>
    </Dialog>
    </Box>
    </Box>
  );
};

export default GPAForm;