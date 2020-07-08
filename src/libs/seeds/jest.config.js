module.exports = {
  name: 'seeds',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/libs/seeds',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js'
  ]
};
