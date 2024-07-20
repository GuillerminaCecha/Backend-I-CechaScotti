module.exports = {
    extends: ["eslint:recommended"],
    parserOptions: {
        ecmaVersion: 2022,
        sourceType: "module",
    },
    rules: {
        "global-require": "off",
        "no-process-env": "off",
        "semi": [ "error", "always" ],
        "quotes": [ "error", "double" ],
        "jsx-quotes": [ "error", "prefer-double" ],
        "indent": [ "error", 4, { "StaticBlock": { "body": 4 } }],
        "camelcase": [ 2, { "properties": "always" }],
        "comma-dangle": [ "error", "always-multiline" ],
        "comma-spacing": [ "error", { "before": false, "after": true }],
        "no-multi-spaces": "error",
        "no-trailing-spaces": [ "error", { "ignoreComments": true }],
        "no-undef": "off",

        "no-multiple-empty-lines": [ "error", { "max": 1, "maxEOF": 1, "maxBOF": 1 }],
        "eol-last": [ "error", "never" ],

        "prefer-const": [ "error", { "destructuring": "any", "ignoreReadBeforeAssign": false }],
        "no-unused-vars": [ "error", { "args": "after-used" }],
       
        "func-style": [ "error", "expression" ],
        "no-spaced-func": "error",
        "max-statements": [ "error", 20 ],
        "arrow-parens": [ "error", "always" ],

        "array-bracket-spacing": [ "error", "always", { "singleValue": false, "arraysInArrays": true, "objectsInArrays": false }],

        "object-curly-spacing": [ "error", "always" ],
    },
};