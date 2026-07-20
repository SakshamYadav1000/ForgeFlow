from sqlalchemy.orm import Session

from app.models.notification import Notification


class NotificationRepository:
    def __init__(self, db: Session):
        self.db = db

    def create(
        self,
        notification: Notification,
    ) -> Notification:
        self.db.add(notification)
        self.db.commit()
        self.db.refresh(notification)
        return notification

    def get_by_id(
        self,
        notification_id: int,
    ) -> Notification | None:
        return (
            self.db.query(Notification)
            .filter(
                Notification.id == notification_id
            )
            .first()
        )

    def get_user_notifications(
        self,
        user_id: int,
    ):
        return (
            self.db.query(Notification)
            .filter(
                Notification.user_id == user_id
            )
            .order_by(
                Notification.created_at.desc()
            )
            .all()
        )

    def update(
        self,
        notification: Notification,
    ) -> Notification:
        self.db.commit()
        self.db.refresh(notification)
        return notification

    def delete(
        self,
        notification: Notification,
    ):
        self.db.delete(notification)
        self.db.commit()

    def mark_all_as_read(
        self,
        user_id: int,
    ):
        (
            self.db.query(Notification)
            .filter(
                Notification.user_id == user_id,
                Notification.is_read.is_(False),
            )
            .update(
                {
                    Notification.is_read: True,
                }
            )
        )

        self.db.commit()