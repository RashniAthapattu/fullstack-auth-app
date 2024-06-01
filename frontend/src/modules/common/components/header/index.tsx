 
import { Box, Typography, AppBar, Toolbar, Link } from '@mui/material/';
import ROUTES from 'modules/common/constants/route';
import styles from '../../../common/scss/index.module.scss';
import useIsAuthenticated from 'modules/common/auth/hooks/useIsAuthenticated';
import { useAuth } from 'modules/common/auth';

const Header = () => {

  const { logout} = useAuth();

  const { isAuthenticated } = useIsAuthenticated();


  return (
     
    <AppBar position="static">
      <Toolbar className={styles.bg}>

        <Box
          sx={{
            flexGrow: 1,
            display: 'flex-right',
            float: 'right',
            alignContent: 'right',
            textAlign: 'right',
          }}
        >
          <Typography
            sx={{
              textDecoration: 'none',
              color: 'white',
              display: 'inline-block',
            }}
          >
            <Link
              href={ROUTES.ROOT}
              style={{
                textDecoration: 'none',
                color: 'white',
                marginRight: '10px',
              }}
            >
              Home
            </Link>
          </Typography>
            
          { isAuthenticated() ? (
            <Typography
              style={{
                textDecoration: 'none',
                color: 'white',
                display: 'inline-block',
              }}
            >
              <Link
                href={ROUTES.ROOT}
                style={{
                  textDecoration: 'none',
                  color: 'white',
                  marginRight: '10px',
                }}
                onClick={() => logout()}
              >
                Logout
              </Link>
            </Typography>
          ) : (
            <>
              <Typography
                style={{
                  textDecoration: 'none',
                  color: 'white',
                  display: 'inline-block',
                }}
              >
                <Link
                  
                
                  href={ROUTES.LOGIN}
                  
                   
                  style={{
                    textDecoration: 'none',
                    color: 'white',
                    marginRight: '10px',
                  }}
                >
                  Login
                </Link>
              </Typography>

              <Typography
                style={{
                  textDecoration: 'none',
                  color: 'white',
                  display: 'inline-block',
                }}
              >
                <Link
                  href={ROUTES.REGISTER}
                  style={{
                    textDecoration: 'none',
                    color: 'white',
                    marginRight: '10px',
                  }}
                >
                  Register
                </Link>
              </Typography>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>

  );
};

export default Header;



