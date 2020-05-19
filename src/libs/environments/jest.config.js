module.exports = {
  name: 'environments',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/libs/environments',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js'
  ]
};
