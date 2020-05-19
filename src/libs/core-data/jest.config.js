module.exports = {
  name: 'core-data',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/libs/core-data',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js'
  ]
};
