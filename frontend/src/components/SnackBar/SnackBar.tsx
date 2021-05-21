import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert, { Color } from '@material-ui/lab/Alert';

interface ISnackBarProps {
  open: boolean;
  message: string | null;
  severity: Color;
  onClose: () => void;
}

const SnackBar = ({
  open,
  message,
  severity,
  onClose,
}: ISnackBarProps): JSX.Element => {
  return (
    <Snackbar
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      open={open}
      onClose={onClose}
    >
      <MuiAlert onClose={onClose} severity={severity}>
        {message}
      </MuiAlert>
    </Snackbar>
  );
};
export default SnackBar;
