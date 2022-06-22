module.exports = {
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'prettier', 'import', 'react'],
  extends: [
    'airbnb',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:prettier/recommended',
    'plugin:@typescript-eslint/recommended',
    'eslint:recommended',
    'plugin:react/recommended',
  ],
  rules: {
    'linebreak-style': 0,
    'import/prefer-default-export': 0,
    'prettier/prettier': 0,
    'import/extensions': 0,
    'no-use-before-define': 1,
    'import/no-unresolved': 0,
    'import/no-extraneous-dependencies': 0, // 테스트 또는 개발환경을 구성하는 파일에서는 devDependency 사용을 허용
    'no-shadow': 0,
    'react/prop-types': 'off',
    'jsx-a11y/no-noninteractive-element-interactions': 0,
    '@typescript-eslint/ban-ts-comment': 'off',
    // 'react/jsx-filename-extension': [0, { extensions: ['.js', '.jsx', '.ts', '.tsx'] }],
    'react/jsx-filename-extension': 0, // react 파일은 jsx로 선언해야하는거 끄기
    'no-unused-vars': 1, // 선언하고 사용하지않은 변수 1은 warning /0은 error
    'no-restricted-globals': ['error', 'event', 'fdescribe'],
    'no-console': 'off', // 콘솔에 노란줄 삭제
  },
  env: {
    browser: true,
    node: true,
  },
  globals: {
    document: false,
  },
};
