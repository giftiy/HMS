import React from "react";

const NotificationCard = ({ notification }) => {
  if (!notification) {
    return (
      <div className="p-4 border rounded bg-gray-100 text-gray-500">
        No notification available
      </div>
    );
  }

  const { message = "No message", title = "Notification", date = "" } =
    notification || {};

  return (
    <div className="p-4 border rounded shadow-sm bg-white mb-2">
      <h3 className="font-semibold text-gray-800">{title}</h3>
      <p className="text-gray-600">{message}</p>
      {date && <span className="text-xs text-gray-400">{date}</span>}
    </div>
  );
};

export default NotificationCard;
