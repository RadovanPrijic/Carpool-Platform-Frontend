import { Notification } from "../types";

interface NotificationComponentProps {
  notification: Notification;
}

const NotificationComponent: React.FC<NotificationComponentProps> = ({
  notification,
}) => {
  return (
    <li key={notification.id}>
      {notification.id} | {notification.message} |{" "}
      {notification.checkedStatus.toString()} | {notification.createdAt}
    </li>
  );
};

export default NotificationComponent;
