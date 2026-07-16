class ForgeFlowException(Exception):
    """Base exception for the application."""


class NotFoundException(ForgeFlowException):
    status_code = 404
    detail = "Resource not found"


class BadRequestException(ForgeFlowException):
    status_code = 400
    detail = "Bad request"


class UnauthorizedException(ForgeFlowException):
    status_code = 401
    detail = "Unauthorized"


class OrganizationNotFoundException(NotFoundException):
    detail = "Organization not found"


class SlugAlreadyExistsException(BadRequestException):
    detail = "Slug already exists"


class EmailAlreadyRegisteredException(BadRequestException):
    detail = "Email already registered"


class InvalidCredentialsException(UnauthorizedException):
    detail = "Invalid email or password"


class OrganizationOwnerRequiredException(BadRequestException):
    detail = "Only the organization owner can perform this action"