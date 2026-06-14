import re
import sys

def fix_markdown_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Count changes
    changes = 0
    
    # Pattern 1: Fix code blocks without language (convert to 'text')
    # Match ``` at start of line followed by newline (not followed by a language identifier)
    pattern = r'^```$'
    
    lines = content.split('\n')
    new_lines = []
    in_code_block = False
    
    for i, line in enumerate(lines):
        # Check if this is a code fence
        if line.strip() == '```':
            if not in_code_block:
                # Opening fence without language
                new_lines.append('```text')
                in_code_block = True
                changes += 1
            else:
                # Closing fence
                new_lines.append(line)
                in_code_block = False
        else:
            new_lines.append(line)
    
    new_content = '\n'.join(new_lines)
    
    # Write back only if changes were made
    if changes > 0:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f"Fixed {changes} code blocks in {filepath}")
        return changes
    else:
        print(f"No code block fixes needed in {filepath}")
        return 0

if __name__ == '__main__':
    if len(sys.argv) < 2:
        print("Usage: python fix_code_blocks.py <file1> [file2] ...")
        sys.exit(1)
    
    total = 0
    for filepath in sys.argv[1:]:
        total += fix_markdown_file(filepath)
    
    print(f"\nTotal: Fixed {total} code blocks across {len(sys.argv)-1} files")
