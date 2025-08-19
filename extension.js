const vscode = require('vscode');

// 中英文标点符号映射
const replacements = {
	'，':',',
	'。':'.',
	'、':'\\',
	'：':':',
	'；':';',
	'？':'?',
	'！':'!',
	'……':'^',
	'·':'`',
	'“':'"',
	'”':'"',
	'‘':"'",
	'’':"'",
	'（':'(',
	'）':')',
	'【':'[',
	'】':']',
	'［':'[',
	'］':']',
	'｛':'{',
	'｝':'}',
	'《':'<',
	'》':'>',
	'＜':'<',
	'＞':'>',
	'——':'_',
	'—':'-',
	'－':'-',
	'–':'-',
	'〜':'~',
	'～':'~',
	'＋':'+',
	'－':'-',
	'＊':'*',
	'＝':'=',
	'／':'/',
	'＼':'\\',
	'％':'%',
	'＾':'^',
	'＆':'&',
	'｜':'|',
	'＄':'$',
	'￥':'$',
	'＠':'@',
	'＃':'#',
	'＿':'_',
	'｀':'`'
};


function activate(context) {
    const disposable = vscode.workspace.onDidChangeTextDocument(event => {
        // 只处理当前活动编辑器的文档
        const editor = vscode.window.activeTextEditor;
        if (!editor || event.document !== editor.document) return;

        // 获取最后一次更改
        const changes = event.contentChanges;
        if (!changes.length) return;
        const change = changes[0];
        const text = change.text;

        if (replacements[text]) {
            editor.edit(editBuilder => {
                editBuilder.replace(change.range, replacements[text]);
            });
        }
    });

    context.subscriptions.push(disposable);
}

function deactivate() {}

module.exports = { activate, deactivate };
