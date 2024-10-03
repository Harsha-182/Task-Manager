import { Box, Typography, Grid } from "@mui/material";
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
    nameGrid: {
        display: 'flex',
        alignItems: 'center',
        marginTop: '20px',
        backgroundColor: '#f2f3f4',
        height: '50px',
        padding: '8px'
    },
    projectGrid: {
        display: 'flex',
        alignItems: 'center',
        marginTop: '20px',
        backgroundColor: '#f2f3f4',
        height: 'auto',
        padding: '8px'
    },

  }));
  
const PageContent = () => {
    const classes = useStyles();
    return(
        <Box>
            Home
            <hr/>
            <Grid xs={8} className={classes.nameGrid}>
                <Typography>Welcome Harsha</Typography>
            </Grid>
            <Grid xs={8} className={classes.projectGrid}>
                <Typography>React (and JavaScript in general), whether or not you use brackets (i.e., curly braces {}) in import statements depends on how the module exports its values.

Here's the distinction:

1. Default Exports (No brackets)
If a module uses a default export, you import it without curly braces. There can only be one default export per module.

Example: Default Export
</Typography>
            </Grid>
        </Box>
    )
}

export default PageContent