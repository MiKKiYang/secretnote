from pydantic import BaseModel

from ..utils.pydantic import ORJSONConfig

from .parsers.timeline import Timeline


class Visualization(BaseModel):
    timeline: Timeline

    class Config(ORJSONConfig):
        pass
