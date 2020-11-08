import {confirmAlert} from "react-confirm-alert"
import 'react-confirm-alert/src/react-confirm-alert.css';

const alert = (id, name, func) => {
    confirmAlert({
      title: 'Confirm to submit',
      message: `Are you sure you want to delete ${name}?`,
      buttons: [
        {
          label: 'Yes',
          onClick: () => func(id)
        },
        {
          label: 'No',
          onClick: () => {}
        }
      ],
      closeOnEscape: true,
      closeOnClickOutside: true,
    });
  };

export default alert;



