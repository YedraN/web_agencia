from pydantic import BaseModel
from typing import Literal
from datetime import datetime


class DashboardStatsResponse(BaseModel):
    activeProjects: int
    totalSpent: int
    nextMilestoneDate: str | None
    unreadInvoices: int


class ActivityItem(BaseModel):
    id: str
    title: str
    time: str
    hasDocument: bool


class MilestoneItem(BaseModel):
    id: str
    title: str
    date: str
    description: str
    completed: bool


class DashboardDataResponse(BaseModel):
    stats: DashboardStatsResponse
    activities: list[ActivityItem]
    milestones: list[MilestoneItem]
