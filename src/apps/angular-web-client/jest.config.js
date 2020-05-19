module.exports = {
  name: 'angular-web-client',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/apps/angular-web-client',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js'
  ]
};
