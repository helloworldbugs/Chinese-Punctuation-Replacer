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

        if (!Object.prototype.hasOwnProperty.call(replacements, text)) return;

        // 替换是异步执行的，期间光标附近的文字可能已经被继续输入或删除。
        // 所以只有当 range 里的内容仍然正好是这个标点时才替换，避免误改别的字符或留下残留的 "。"
        const start = change.range.start;
        const range = new vscode.Range(start, start.translate(0, text.length));
        editor.edit(editBuilder => {
            if (editor.document.getText(range) !== text) return;
            editBuilder.replace(range, replacements[text]);
        });
    });

    context.subscriptions.push(disposable);
}

function deactivate() {}

module.exports = { activate, deactivate };
