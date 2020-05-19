module.exports = {
  name: 'ui-login',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/libs/ui-login',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js'
  ]
};
