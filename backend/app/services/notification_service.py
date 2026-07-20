from sqlalchemy.orm import Session

from app.core.exceptions import (
    NotificationNotFoundException,
)
from app.models.notification import (
    Notification,
    NotificationType,
)
from app.models.user import User
from app.repositories.notification_repository import (
    NotificationRepository,
)


class NotificationService:
    def __init__(self, db: Session):
        self.notification_repository = (
            NotificationRepository(db)
        )

    def create_notification(
        self,
        user_id: int,
        title: str,
        message: str,
        notification_type: NotificationType,
    ):
        notification = Notification(
            user_id=user_id,
            title=title,
            message=message,
            notification_type=notification_type,
        )

        return self.notification_repository.create(
            notification
        )

    def get_my_notifications(
        self,
        current_user: User,
    ):
        return (
            self.notification_repository.get_user_notifications(
                current_user.id
            )
        )

    def mark_as_read(
        self,
        notification_id: int,
        current_user: User,
    ):
        notification = (
            self.notification_repository.get_by_id(
                notification_id
            )
        )

        if notification is None:
            raise NotificationNotFoundException()

        if notification.user_id != current_user.id:
            raise NotificationNotFoundException()

        notification.is_read = True

        return self.notification_repository.update(
            notification
        )

    def mark_all_as_read(
        self,
        current_user: User,
    ):
        self.notification_repository.mark_all_as_read(
            current_user.id
        )

        return {
            "message": "All notifications marked as read"
        }

    def delete_notification(
        self,
        notification_id: int,
        current_user: User,
    ):
        notification = (
            self.notification_repository.get_by_id(
                notification_id
            )
        )

        if notification is None:
            raise NotificationNotFoundException()

        if notification.user_id != current_user.id:
            raise NotificationNotFoundException()

        self.notification_repository.delete(
            notification
        )