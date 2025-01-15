import React, { useState } from 'react';
import { 
  Container, Typography, Paper, Card, CardContent,
  useTheme, Grid, Box, Divider
} from '@mui/material';
import {
  School as SchoolIcon,
  Calculate as CalculateIcon,
  Info as InfoIcon,
  Star as StarIcon,
  AccountBalance as UniversityIcon
} from '@mui/icons-material';
import GPAForm from "../components/GPAForm";

const Home = () => {
    const theme = useTheme();
    const [decimalPlaces, setDecimalPlaces] = useState(2);
    const [gpaData, setGpaData] = useState({
      totalGradePoints: 0,
      totalCredits: 0,
      cumulativeGPA: 0
    });
  
    const handleDecimalChange = (newDecimals) => {
      setDecimalPlaces(newDecimals);
      if (gpaData.totalCredits > 0) {
        const rawGPA = gpaData.totalGradePoints / gpaData.totalCredits;
        setGpaData(prev => ({
          ...prev,
          cumulativeGPA: Number(rawGPA.toFixed(newDecimals))
        }));
      }
    };
  
    const updateGPA = (gradePoints, credits) => {
      const rawGPA = credits > 0 ? gradePoints / credits : 0;
      
      setGpaData({
        totalGradePoints: Math.round(gradePoints), // Round grade points
        totalCredits: credits,
        cumulativeGPA: Number(rawGPA.toFixed(decimalPlaces))
      });
    };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
        
      <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>

        <GPAForm 
          onUpdate={updateGPA}
          decimalPlaces={decimalPlaces}
          onDecimalChange={handleDecimalChange}
        />

        <Card elevation={2} sx={{ mt: 4, background: theme.palette.primary.main, color: 'white' }}>
          <CardContent>
            <Typography variant="h5" gutterBottom>
              Current GPA
            </Typography>
            <Typography variant="h4">
              {gpaData.cumulativeGPA.toFixed(decimalPlaces)}
            </Typography>
          </CardContent>
        </Card>
      </Paper>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 2, mb: 4, mt: 4 }}>
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <UniversityIcon sx={{ fontSize: 48, color: theme.palette.primary.main, mb: 2 }} />
          <Typography variant="h4" gutterBottom color="primary">
            GPA Calculator
          </Typography>
          <Divider sx={{ my: 2 }} />
        </Box>

        <Grid container spacing={4} sx={{ mb: 4 }}>
          <Grid item xs={12} md={6}>
            <Card elevation={2} sx={{ height: '100%' }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <CalculateIcon sx={{ mr: 1, color: theme.palette.primary.main }} />
                  <Typography variant="h6">What is GPA?</Typography>
                </Box>
                <Typography variant="body2">
                  A grade point average (GPA) represents the average of a student's grades during a study period, 
                  weighted by module credits.
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card elevation={2} sx={{ height: '100%' }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <SchoolIcon sx={{ mr: 1, color: theme.palette.primary.main }} />
                  <Typography variant="h6">Why Credits Matter</Typography>
                </Box>
                <Typography variant="body2">
                  Module credits reflect duration and complexity, making the GPA calculation 
                  a better indication of academic performance.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

         <Box sx={{ mb: 4 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <StarIcon sx={{ mr: 1, color: theme.palette.primary.main }} />
            <Typography variant="h6">GPA Applications</Typography>
          </Box>
          <Grid container spacing={2}>
            {[
              'Financial aid (bursaries)',
              'Residence placement',
              'Access to postgraduate courses',
              'Student leadership positions'
            ].map((item, index) => (
              <Grid item xs={12} sm={6} key={index}>
                <Card variant="outlined" sx={{ p: 2 }}>
                  <Typography variant="body2">{item}</Typography>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Paper>
    </Container>
  );
};

export default Home;