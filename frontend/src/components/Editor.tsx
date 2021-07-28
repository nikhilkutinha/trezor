import { ChangeEvent } from "react";

import IconLoader from "./icons/IconLoader";
import MonacoEditor from "@monaco-editor/react";

type Props = {
	text?: string;
	language: string;
	className?: string;
	onChange?: (value: string, event: ChangeEvent<HTMLTextAreaElement>) => void;
};

function Editor({ text, onChange, language, className }: Props) {
	function handleEditorWillMount(monaco: any) {
		defineTheme(monaco);
		disableValidation(monaco);
	}

	function defineTheme(monaco: any) {
		monaco.editor.defineTheme("blue", {
			base: "vs-dark",
			inherit: true,
			rules: [],
			colors: { "editor.background": "#111827" },
		});
	}

	function disableValidation(monaco: any) {
		monaco.languages.typescript.typescriptDefaults.setDiagnosticsOptions({
			noSemanticValidation: true,
			noSyntaxValidation: true,
		});
	}

	return (
		<MonacoEditor
			theme="blue"
			className={className}
			language={language}
			value={text}
			loading={<IconLoader className="h-6 w-6 text-white" />}
			beforeMount={handleEditorWillMount}
			options={{
				minimap: {
					enabled: false,
				},
				padding: {
					top: 30,
				},
				quickSuggestions: false,
			}}
			onChange={onChange}
		/>
	);
}

export default Editor;
