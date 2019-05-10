import BabelInlineImportHelper from './helper';

export default function({ types, parse }) {
  class BabelInlineImport {
    constructor() {
      return {
        visitor: {
          CallExpression: {
            exit: function exit(path, state) {
              if (path.node.callee.type !== 'Import') {
                return;
              }
              var givenPath = path.node.arguments[0].value;
              var reference = state && state.file && state.file.opts.filename;
              let extensions = state && state.opts && state.opts.extensions;

              if (!BabelInlineImportHelper.shouldBeInlined(givenPath, extensions)) {
                return;
              }

              var content = BabelInlineImportHelper.getContents(givenPath, reference);

              path.replaceWith(parse(`Promise.resolve(\`${content.replace(/\\/g, '\\\\').replace(/\`/g, '\\`')}\`)`).program.body[0].expression);
            },
          },
        }
      };
    }
  }

  return new BabelInlineImport();
}
