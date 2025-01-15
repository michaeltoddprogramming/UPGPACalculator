import React, { useState } from 'react';
import {
  Container,
  Typography,
  Paper,
  Card,
  CardContent,
  useTheme
} from '@mui/material';
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
    </Container>
  );
};

export default Home;