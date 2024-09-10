import { useMutation, useQuery } from "@tanstack/react-query";
import { useAppDispatch, useAppSelector } from "../../../hooks/store-hooks";
import { getUserNotifications } from "../../../services/user-service";
import { useEffect } from "react";
import { queryClient } from "../../../utils/api-config";
import { userActions } from "../user-slice";

const NotificationsPage = () => {
  const dispatch = useAppDispatch();
  const userId = useAppSelector((state) => state.auth.userId);

  const {
    data: notifications,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["notifications", userId],
    queryFn: () => getUserNotifications({ id: userId, markAsChecked: false }),
  });

  const { mutate } = useMutation({
    mutationFn: getUserNotifications,
    onSuccess: (updatedNotifications) => {
      queryClient.invalidateQueries({ queryKey: ["notifications", userId] });
      dispatch(userActions.updateUserNotifications(updatedNotifications));
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const updatedNotifications = await getUserNotifications({
          id: userId,
          markAsChecked: false,
        });
        dispatch(userActions.updateUserNotifications(updatedNotifications));
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };

    const interval = setInterval(() => {
      fetchData();
    }, 120000);

    return () => clearInterval(interval);
  }, [userId, dispatch]);

  useEffect(() => {
    const handleBeforeUnload = () => {
      mutate({ id: userId, markAsChecked: true });
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      mutate({ id: userId, markAsChecked: true });
    };
  }, [userId, mutate]);

  let content;

  if (isLoading) {
    content = <p>Loading rides ...</p>;
  }

  if (error) {
    content = <p>Error! {error.message}</p>;
  }

  if (notifications) {
    content = (
      <>
        <ul>
          {notifications.map((notification) => (
            <li key={notification.id}>
              {notification.id} {notification.message}{" "}
              {notification.checkedStatus}
            </li>
          ))}
        </ul>
      </>
    );
  }

  return (
    <section>
      <header>
        <h2>Notifications</h2>
      </header>
      {content}
    </section>
  );
};

export default NotificationsPage;
