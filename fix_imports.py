import os
import glob

files = glob.glob('frontend/src/app/**/*.tsx', recursive=True)

import_stmt = 'import { MobileMenu } from "@/components/MobileMenu";\n'

fixed_count = 0
for file_path in files:
    with open(file_path, 'r', encoding='utf-8') as f:
        lines = f.readlines()
    
    needs_fix = False
    new_lines = []
    found_at_top = False
    
    for i, line in enumerate(lines):
        if 'import { MobileMenu }' in line:
            if i > 11:  # Not at the top
                needs_fix = True
                continue
            else:
                found_at_top = True
                new_lines.append(line)
        else:
            new_lines.append(line)
            
    if needs_fix:
        if not found_at_top:
            insert_idx = 0
            for i, line in enumerate(new_lines):
                if line.startswith('import '):
                    insert_idx = i + 1
            new_lines.insert(insert_idx, import_stmt)
            
        with open(file_path, 'w', encoding='utf-8') as f:
            f.writelines(new_lines)
        print(f"Fixed {file_path}")
        fixed_count += 1

print(f"Fixed {fixed_count} files.")
