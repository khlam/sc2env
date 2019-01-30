# Generated by the protocol buffer compiler.  DO NOT EDIT!
# source: explanation.proto

import sys
_b=sys.version_info[0]<3 and (lambda x:x) or (lambda x:x.encode('latin1'))
from google.protobuf import descriptor as _descriptor
from google.protobuf import message as _message
from google.protobuf import reflection as _reflection
from google.protobuf import symbol_database as _symbol_database
from google.protobuf import descriptor_pb2
# @@protoc_insertion_point(imports)

_sym_db = _symbol_database.Default()




DESCRIPTOR = _descriptor.FileDescriptor(
  name='explanation.proto',
  package='sc2env.replay',
  syntax='proto2',
  serialized_pb=_b('\n\x11\x65xplanation.proto\x12\rsc2env.replay\"P\n\x11\x45xplanationPoints\x12;\n\x12\x65xplanation_points\x18\x01 \x03(\x0b\x32\x1f.sc2env.replay.ExplanationPoint\"\xa7\x01\n\x10\x45xplanationPoint\x12\x0c\n\x04step\x18\x01 \x01(\r\x12\n\n\x02id\x18\x02 \x01(\r\x12\r\n\x05title\x18\x03 \x01(\t\x12\x13\n\x0b\x64\x65scription\x18\x04 \x01(\t\x12)\n\x08saliency\x18\x05 \x01(\x0b\x32\x17.sc2env.replay.Saliency\x12*\n\tbar_chart\x18\x06 \x01(\x0b\x32\x17.sc2env.replay.BarChart\"d\n\x08\x42\x61rChart\x12\'\n\x06groups\x18\x01 \x03(\x0b\x32\x17.sc2env.replay.BarGroup\x12\r\n\x05title\x18\x02 \x01(\t\x12\x0f\n\x07v_title\x18\x03 \x01(\t\x12\x0f\n\x07h_title\x18\x04 \x01(\t\"^\n\x08\x42\x61rGroup\x12\r\n\x05value\x18\x01 \x01(\x01\x12 \n\x04\x62\x61rs\x18\x02 \x03(\x0b\x32\x12.sc2env.replay.Bar\x12\x13\n\x0bsaliency_id\x18\x03 \x01(\t\x12\x0c\n\x04name\x18\x04 \x01(\t\"7\n\x03\x42\x61r\x12\r\n\x05value\x18\x01 \x02(\x01\x12\x13\n\x0bsaliency_id\x18\x02 \x01(\t\x12\x0c\n\x04name\x18\x03 \x01(\t\"C\n\x05Layer\x12\x0c\n\x04name\x18\x01 \x01(\t\x12\r\n\x05\x63\x65lls\x18\x02 \x03(\x01\x12\r\n\x05width\x18\x03 \x01(\r\x12\x0e\n\x06height\x18\x04 \x01(\r\".\n\x06Layers\x12$\n\x06layers\x18\x01 \x03(\x0b\x32\x14.sc2env.replay.Layer\"\x95\x01\n\x08Saliency\x12>\n\x0csaliency_map\x18\x01 \x03(\x0b\x32(.sc2env.replay.Saliency.SaliencyMapEntry\x1aI\n\x10SaliencyMapEntry\x12\x0b\n\x03key\x18\x01 \x01(\t\x12$\n\x05value\x18\x02 \x01(\x0b\x32\x15.sc2env.replay.Layers:\x02\x38\x01')
)
_sym_db.RegisterFileDescriptor(DESCRIPTOR)




_EXPLANATIONPOINTS = _descriptor.Descriptor(
  name='ExplanationPoints',
  full_name='sc2env.replay.ExplanationPoints',
  filename=None,
  file=DESCRIPTOR,
  containing_type=None,
  fields=[
    _descriptor.FieldDescriptor(
      name='explanation_points', full_name='sc2env.replay.ExplanationPoints.explanation_points', index=0,
      number=1, type=11, cpp_type=10, label=3,
      has_default_value=False, default_value=[],
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      options=None),
  ],
  extensions=[
  ],
  nested_types=[],
  enum_types=[
  ],
  options=None,
  is_extendable=False,
  syntax='proto2',
  extension_ranges=[],
  oneofs=[
  ],
  serialized_start=36,
  serialized_end=116,
)


_EXPLANATIONPOINT = _descriptor.Descriptor(
  name='ExplanationPoint',
  full_name='sc2env.replay.ExplanationPoint',
  filename=None,
  file=DESCRIPTOR,
  containing_type=None,
  fields=[
    _descriptor.FieldDescriptor(
      name='step', full_name='sc2env.replay.ExplanationPoint.step', index=0,
      number=1, type=13, cpp_type=3, label=1,
      has_default_value=False, default_value=0,
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      options=None),
    _descriptor.FieldDescriptor(
      name='id', full_name='sc2env.replay.ExplanationPoint.id', index=1,
      number=2, type=13, cpp_type=3, label=1,
      has_default_value=False, default_value=0,
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      options=None),
    _descriptor.FieldDescriptor(
      name='title', full_name='sc2env.replay.ExplanationPoint.title', index=2,
      number=3, type=9, cpp_type=9, label=1,
      has_default_value=False, default_value=_b("").decode('utf-8'),
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      options=None),
    _descriptor.FieldDescriptor(
      name='description', full_name='sc2env.replay.ExplanationPoint.description', index=3,
      number=4, type=9, cpp_type=9, label=1,
      has_default_value=False, default_value=_b("").decode('utf-8'),
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      options=None),
    _descriptor.FieldDescriptor(
      name='saliency', full_name='sc2env.replay.ExplanationPoint.saliency', index=4,
      number=5, type=11, cpp_type=10, label=1,
      has_default_value=False, default_value=None,
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      options=None),
    _descriptor.FieldDescriptor(
      name='bar_chart', full_name='sc2env.replay.ExplanationPoint.bar_chart', index=5,
      number=6, type=11, cpp_type=10, label=1,
      has_default_value=False, default_value=None,
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      options=None),
  ],
  extensions=[
  ],
  nested_types=[],
  enum_types=[
  ],
  options=None,
  is_extendable=False,
  syntax='proto2',
  extension_ranges=[],
  oneofs=[
  ],
  serialized_start=119,
  serialized_end=286,
)


_BARCHART = _descriptor.Descriptor(
  name='BarChart',
  full_name='sc2env.replay.BarChart',
  filename=None,
  file=DESCRIPTOR,
  containing_type=None,
  fields=[
    _descriptor.FieldDescriptor(
      name='groups', full_name='sc2env.replay.BarChart.groups', index=0,
      number=1, type=11, cpp_type=10, label=3,
      has_default_value=False, default_value=[],
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      options=None),
    _descriptor.FieldDescriptor(
      name='title', full_name='sc2env.replay.BarChart.title', index=1,
      number=2, type=9, cpp_type=9, label=1,
      has_default_value=False, default_value=_b("").decode('utf-8'),
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      options=None),
    _descriptor.FieldDescriptor(
      name='v_title', full_name='sc2env.replay.BarChart.v_title', index=2,
      number=3, type=9, cpp_type=9, label=1,
      has_default_value=False, default_value=_b("").decode('utf-8'),
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      options=None),
    _descriptor.FieldDescriptor(
      name='h_title', full_name='sc2env.replay.BarChart.h_title', index=3,
      number=4, type=9, cpp_type=9, label=1,
      has_default_value=False, default_value=_b("").decode('utf-8'),
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      options=None),
  ],
  extensions=[
  ],
  nested_types=[],
  enum_types=[
  ],
  options=None,
  is_extendable=False,
  syntax='proto2',
  extension_ranges=[],
  oneofs=[
  ],
  serialized_start=288,
  serialized_end=388,
)


_BARGROUP = _descriptor.Descriptor(
  name='BarGroup',
  full_name='sc2env.replay.BarGroup',
  filename=None,
  file=DESCRIPTOR,
  containing_type=None,
  fields=[
    _descriptor.FieldDescriptor(
      name='value', full_name='sc2env.replay.BarGroup.value', index=0,
      number=1, type=1, cpp_type=5, label=1,
      has_default_value=False, default_value=float(0),
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      options=None),
    _descriptor.FieldDescriptor(
      name='bars', full_name='sc2env.replay.BarGroup.bars', index=1,
      number=2, type=11, cpp_type=10, label=3,
      has_default_value=False, default_value=[],
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      options=None),
    _descriptor.FieldDescriptor(
      name='saliency_id', full_name='sc2env.replay.BarGroup.saliency_id', index=2,
      number=3, type=9, cpp_type=9, label=1,
      has_default_value=False, default_value=_b("").decode('utf-8'),
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      options=None),
    _descriptor.FieldDescriptor(
      name='name', full_name='sc2env.replay.BarGroup.name', index=3,
      number=4, type=9, cpp_type=9, label=1,
      has_default_value=False, default_value=_b("").decode('utf-8'),
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      options=None),
  ],
  extensions=[
  ],
  nested_types=[],
  enum_types=[
  ],
  options=None,
  is_extendable=False,
  syntax='proto2',
  extension_ranges=[],
  oneofs=[
  ],
  serialized_start=390,
  serialized_end=484,
)


_BAR = _descriptor.Descriptor(
  name='Bar',
  full_name='sc2env.replay.Bar',
  filename=None,
  file=DESCRIPTOR,
  containing_type=None,
  fields=[
    _descriptor.FieldDescriptor(
      name='value', full_name='sc2env.replay.Bar.value', index=0,
      number=1, type=1, cpp_type=5, label=2,
      has_default_value=False, default_value=float(0),
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      options=None),
    _descriptor.FieldDescriptor(
      name='saliency_id', full_name='sc2env.replay.Bar.saliency_id', index=1,
      number=2, type=9, cpp_type=9, label=1,
      has_default_value=False, default_value=_b("").decode('utf-8'),
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      options=None),
    _descriptor.FieldDescriptor(
      name='name', full_name='sc2env.replay.Bar.name', index=2,
      number=3, type=9, cpp_type=9, label=1,
      has_default_value=False, default_value=_b("").decode('utf-8'),
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      options=None),
  ],
  extensions=[
  ],
  nested_types=[],
  enum_types=[
  ],
  options=None,
  is_extendable=False,
  syntax='proto2',
  extension_ranges=[],
  oneofs=[
  ],
  serialized_start=486,
  serialized_end=541,
)


_LAYER = _descriptor.Descriptor(
  name='Layer',
  full_name='sc2env.replay.Layer',
  filename=None,
  file=DESCRIPTOR,
  containing_type=None,
  fields=[
    _descriptor.FieldDescriptor(
      name='name', full_name='sc2env.replay.Layer.name', index=0,
      number=1, type=9, cpp_type=9, label=1,
      has_default_value=False, default_value=_b("").decode('utf-8'),
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      options=None),
    _descriptor.FieldDescriptor(
      name='cells', full_name='sc2env.replay.Layer.cells', index=1,
      number=2, type=1, cpp_type=5, label=3,
      has_default_value=False, default_value=[],
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      options=None),
    _descriptor.FieldDescriptor(
      name='width', full_name='sc2env.replay.Layer.width', index=2,
      number=3, type=13, cpp_type=3, label=1,
      has_default_value=False, default_value=0,
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      options=None),
    _descriptor.FieldDescriptor(
      name='height', full_name='sc2env.replay.Layer.height', index=3,
      number=4, type=13, cpp_type=3, label=1,
      has_default_value=False, default_value=0,
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      options=None),
  ],
  extensions=[
  ],
  nested_types=[],
  enum_types=[
  ],
  options=None,
  is_extendable=False,
  syntax='proto2',
  extension_ranges=[],
  oneofs=[
  ],
  serialized_start=543,
  serialized_end=610,
)


_LAYERS = _descriptor.Descriptor(
  name='Layers',
  full_name='sc2env.replay.Layers',
  filename=None,
  file=DESCRIPTOR,
  containing_type=None,
  fields=[
    _descriptor.FieldDescriptor(
      name='layers', full_name='sc2env.replay.Layers.layers', index=0,
      number=1, type=11, cpp_type=10, label=3,
      has_default_value=False, default_value=[],
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      options=None),
  ],
  extensions=[
  ],
  nested_types=[],
  enum_types=[
  ],
  options=None,
  is_extendable=False,
  syntax='proto2',
  extension_ranges=[],
  oneofs=[
  ],
  serialized_start=612,
  serialized_end=658,
)


_SALIENCY_SALIENCYMAPENTRY = _descriptor.Descriptor(
  name='SaliencyMapEntry',
  full_name='sc2env.replay.Saliency.SaliencyMapEntry',
  filename=None,
  file=DESCRIPTOR,
  containing_type=None,
  fields=[
    _descriptor.FieldDescriptor(
      name='key', full_name='sc2env.replay.Saliency.SaliencyMapEntry.key', index=0,
      number=1, type=9, cpp_type=9, label=1,
      has_default_value=False, default_value=_b("").decode('utf-8'),
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      options=None),
    _descriptor.FieldDescriptor(
      name='value', full_name='sc2env.replay.Saliency.SaliencyMapEntry.value', index=1,
      number=2, type=11, cpp_type=10, label=1,
      has_default_value=False, default_value=None,
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      options=None),
  ],
  extensions=[
  ],
  nested_types=[],
  enum_types=[
  ],
  options=_descriptor._ParseOptions(descriptor_pb2.MessageOptions(), _b('8\001')),
  is_extendable=False,
  syntax='proto2',
  extension_ranges=[],
  oneofs=[
  ],
  serialized_start=737,
  serialized_end=810,
)

_SALIENCY = _descriptor.Descriptor(
  name='Saliency',
  full_name='sc2env.replay.Saliency',
  filename=None,
  file=DESCRIPTOR,
  containing_type=None,
  fields=[
    _descriptor.FieldDescriptor(
      name='saliency_map', full_name='sc2env.replay.Saliency.saliency_map', index=0,
      number=1, type=11, cpp_type=10, label=3,
      has_default_value=False, default_value=[],
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      options=None),
  ],
  extensions=[
  ],
  nested_types=[_SALIENCY_SALIENCYMAPENTRY, ],
  enum_types=[
  ],
  options=None,
  is_extendable=False,
  syntax='proto2',
  extension_ranges=[],
  oneofs=[
  ],
  serialized_start=661,
  serialized_end=810,
)

_EXPLANATIONPOINTS.fields_by_name['explanation_points'].message_type = _EXPLANATIONPOINT
_EXPLANATIONPOINT.fields_by_name['saliency'].message_type = _SALIENCY
_EXPLANATIONPOINT.fields_by_name['bar_chart'].message_type = _BARCHART
_BARCHART.fields_by_name['groups'].message_type = _BARGROUP
_BARGROUP.fields_by_name['bars'].message_type = _BAR
_LAYERS.fields_by_name['layers'].message_type = _LAYER
_SALIENCY_SALIENCYMAPENTRY.fields_by_name['value'].message_type = _LAYERS
_SALIENCY_SALIENCYMAPENTRY.containing_type = _SALIENCY
_SALIENCY.fields_by_name['saliency_map'].message_type = _SALIENCY_SALIENCYMAPENTRY
DESCRIPTOR.message_types_by_name['ExplanationPoints'] = _EXPLANATIONPOINTS
DESCRIPTOR.message_types_by_name['ExplanationPoint'] = _EXPLANATIONPOINT
DESCRIPTOR.message_types_by_name['BarChart'] = _BARCHART
DESCRIPTOR.message_types_by_name['BarGroup'] = _BARGROUP
DESCRIPTOR.message_types_by_name['Bar'] = _BAR
DESCRIPTOR.message_types_by_name['Layer'] = _LAYER
DESCRIPTOR.message_types_by_name['Layers'] = _LAYERS
DESCRIPTOR.message_types_by_name['Saliency'] = _SALIENCY

ExplanationPoints = _reflection.GeneratedProtocolMessageType('ExplanationPoints', (_message.Message,), dict(
  DESCRIPTOR = _EXPLANATIONPOINTS,
  __module__ = 'explanation_pb2'
  # @@protoc_insertion_point(class_scope:sc2env.replay.ExplanationPoints)
  ))
_sym_db.RegisterMessage(ExplanationPoints)

ExplanationPoint = _reflection.GeneratedProtocolMessageType('ExplanationPoint', (_message.Message,), dict(
  DESCRIPTOR = _EXPLANATIONPOINT,
  __module__ = 'explanation_pb2'
  # @@protoc_insertion_point(class_scope:sc2env.replay.ExplanationPoint)
  ))
_sym_db.RegisterMessage(ExplanationPoint)

BarChart = _reflection.GeneratedProtocolMessageType('BarChart', (_message.Message,), dict(
  DESCRIPTOR = _BARCHART,
  __module__ = 'explanation_pb2'
  # @@protoc_insertion_point(class_scope:sc2env.replay.BarChart)
  ))
_sym_db.RegisterMessage(BarChart)

BarGroup = _reflection.GeneratedProtocolMessageType('BarGroup', (_message.Message,), dict(
  DESCRIPTOR = _BARGROUP,
  __module__ = 'explanation_pb2'
  # @@protoc_insertion_point(class_scope:sc2env.replay.BarGroup)
  ))
_sym_db.RegisterMessage(BarGroup)

Bar = _reflection.GeneratedProtocolMessageType('Bar', (_message.Message,), dict(
  DESCRIPTOR = _BAR,
  __module__ = 'explanation_pb2'
  # @@protoc_insertion_point(class_scope:sc2env.replay.Bar)
  ))
_sym_db.RegisterMessage(Bar)

Layer = _reflection.GeneratedProtocolMessageType('Layer', (_message.Message,), dict(
  DESCRIPTOR = _LAYER,
  __module__ = 'explanation_pb2'
  # @@protoc_insertion_point(class_scope:sc2env.replay.Layer)
  ))
_sym_db.RegisterMessage(Layer)

Layers = _reflection.GeneratedProtocolMessageType('Layers', (_message.Message,), dict(
  DESCRIPTOR = _LAYERS,
  __module__ = 'explanation_pb2'
  # @@protoc_insertion_point(class_scope:sc2env.replay.Layers)
  ))
_sym_db.RegisterMessage(Layers)

Saliency = _reflection.GeneratedProtocolMessageType('Saliency', (_message.Message,), dict(

  SaliencyMapEntry = _reflection.GeneratedProtocolMessageType('SaliencyMapEntry', (_message.Message,), dict(
    DESCRIPTOR = _SALIENCY_SALIENCYMAPENTRY,
    __module__ = 'explanation_pb2'
    # @@protoc_insertion_point(class_scope:sc2env.replay.Saliency.SaliencyMapEntry)
    ))
  ,
  DESCRIPTOR = _SALIENCY,
  __module__ = 'explanation_pb2'
  # @@protoc_insertion_point(class_scope:sc2env.replay.Saliency)
  ))
_sym_db.RegisterMessage(Saliency)
_sym_db.RegisterMessage(Saliency.SaliencyMapEntry)


_SALIENCY_SALIENCYMAPENTRY.has_options = True
_SALIENCY_SALIENCYMAPENTRY._options = _descriptor._ParseOptions(descriptor_pb2.MessageOptions(), _b('8\001'))
# @@protoc_insertion_point(module_scope)
