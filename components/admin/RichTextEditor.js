'use client';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import Link from '@tiptap/extension-link';
import Placeholder from '@tiptap/extension-placeholder';
import {
  Bold,
  Italic,
  UnderlineIcon,
  List,
  ListOrdered,
  Heading2,
  Heading3,
  Link2,
  Eraser,
} from 'lucide-react';

function ToolbarButton({ onClick, active, title, children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      title={title}
      className="w-8 h-8 flex items-center justify-center rounded transition-colors text-sm"
      style={{
        backgroundColor: active ? '#0F172A' : 'transparent',
        color: active ? '#fff' : '#64748B',
      }}
    >
      {children}
    </button>
  );
}

/**
 * RichTextEditor — TipTap editor with formatting toolbar.
 * Props:
 *   value       — HTML string
 *   onChange    — (html: string) => void
 *   placeholder — string
 */
export default function RichTextEditor({
  value = '',
  onChange,
  placeholder = 'Write property description here…',
}) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link.configure({ openOnClick: false }),
      Placeholder.configure({ placeholder }),
    ],
    content: value,
    onUpdate({ editor }) {
      onChange?.(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: 'focus:outline-none min-h-[180px] text-sm leading-relaxed',
        style: 'color: #0F172A;',
      },
    },
  });

  const setLink = () => {
    const url = window.prompt('Enter URL:');
    if (!url) return;
    if (editor.isActive('link')) {
      editor.chain().focus().unsetLink().run();
    } else {
      editor.chain().focus().setLink({ href: url }).run();
    }
  };

  if (!editor) return null;

  return (
    <div className="rounded-md overflow-hidden" style={{ border: '1px solid #E2E8F0' }}>
      {/* Toolbar */}
      <div
        className="flex items-center flex-wrap gap-0.5 px-2 py-1.5"
        style={{ borderBottom: '1px solid #E2E8F0', backgroundColor: '#F8FAFC' }}
      >
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBold().run()}
          active={editor.isActive('bold')}
          title="Bold"
        >
          <Bold className="w-3.5 h-3.5" />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleItalic().run()}
          active={editor.isActive('italic')}
          title="Italic"
        >
          <Italic className="w-3.5 h-3.5" />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          active={editor.isActive('underline')}
          title="Underline"
        >
          <UnderlineIcon className="w-3.5 h-3.5" />
        </ToolbarButton>

        <div className="w-px h-5 mx-1" style={{ backgroundColor: '#E2E8F0' }} />

        <ToolbarButton
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          active={editor.isActive('heading', { level: 2 })}
          title="Heading 2"
        >
          <Heading2 className="w-3.5 h-3.5" />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          active={editor.isActive('heading', { level: 3 })}
          title="Heading 3"
        >
          <Heading3 className="w-3.5 h-3.5" />
        </ToolbarButton>

        <div className="w-px h-5 mx-1" style={{ backgroundColor: '#E2E8F0' }} />

        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          active={editor.isActive('bulletList')}
          title="Bullet List"
        >
          <List className="w-3.5 h-3.5" />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          active={editor.isActive('orderedList')}
          title="Numbered List"
        >
          <ListOrdered className="w-3.5 h-3.5" />
        </ToolbarButton>

        <div className="w-px h-5 mx-1" style={{ backgroundColor: '#E2E8F0' }} />

        <ToolbarButton
          onClick={setLink}
          active={editor.isActive('link')}
          title="Link"
        >
          <Link2 className="w-3.5 h-3.5" />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().clearNodes().unsetAllMarks().run()}
          active={false}
          title="Clear Formatting"
        >
          <Eraser className="w-3.5 h-3.5" />
        </ToolbarButton>
      </div>

      {/* Editor area */}
      <div className="px-4 py-3 bg-white">
        <EditorContent editor={editor} />
      </div>

      {/* TipTap placeholder style */}
      <style>{`
        .tiptap p.is-editor-empty:first-child::before {
          content: attr(data-placeholder);
          float: left;
          color: #94A3B8;
          pointer-events: none;
          height: 0;
        }
        .tiptap h2 { font-size: 1.25rem; font-weight: 600; margin: 0.75rem 0 0.5rem; }
        .tiptap h3 { font-size: 1.1rem; font-weight: 600; margin: 0.75rem 0 0.5rem; }
        .tiptap ul { list-style: disc; padding-left: 1.25rem; margin: 0.5rem 0; }
        .tiptap ol { list-style: decimal; padding-left: 1.25rem; margin: 0.5rem 0; }
        .tiptap a { color: #D4A017; text-decoration: underline; }
        .tiptap p { margin-bottom: 0.5rem; }
      `}</style>
    </div>
  );
}
