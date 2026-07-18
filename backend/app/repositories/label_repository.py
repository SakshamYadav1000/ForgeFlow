from sqlalchemy.orm import Session

from app.models.issue_label import IssueLabel
from app.models.label import Label


class LabelRepository:
    def __init__(self, db: Session):
        self.db = db

    # --------------------------
    # Label CRUD
    # --------------------------

    def create_label(self, label: Label):
        self.db.add(label)
        self.db.commit()
        self.db.refresh(label)
        return label

    def get_label(self, label_id: int):
        return (
            self.db.query(Label)
            .filter(Label.id == label_id)
            .first()
        )

    def get_labels_by_organization(
        self,
        organization_id: int,
    ):
        return (
            self.db.query(Label)
            .filter(
                Label.organization_id == organization_id
            )
            .all()
        )

    def update_label(self, label: Label):
        self.db.commit()
        self.db.refresh(label)
        return label

    def delete_label(self, label: Label):
        self.db.delete(label)
        self.db.commit()

    # --------------------------
    # Issue Labels
    # --------------------------

    def attach_label_to_issue(
        self,
        issue_id: int,
        label_id: int,
    ):
        issue_label = IssueLabel(
            issue_id=issue_id,
            label_id=label_id,
        )

        self.db.add(issue_label)
        self.db.commit()
        return issue_label

    def remove_label_from_issue(
        self,
        issue_id: int,
        label_id: int,
    ):
        issue_label = (
            self.db.query(IssueLabel)
            .filter(
                IssueLabel.issue_id == issue_id,
                IssueLabel.label_id == label_id,
            )
            .first()
        )

        if issue_label:
            self.db.delete(issue_label)
            self.db.commit()

    def get_issue_labels(
        self,
        issue_id: int,
    ):
        return (
            self.db.query(Label)
            .join(
                IssueLabel,
                Label.id == IssueLabel.label_id,
            )
            .filter(
                IssueLabel.issue_id == issue_id
            )
            .all()
        )

    def issue_has_label(
        self,
        issue_id: int,
        label_id: int,
    ):
        return (
            self.db.query(IssueLabel)
            .filter(
                IssueLabel.issue_id == issue_id,
                IssueLabel.label_id == label_id,
            )
            .first()
        )