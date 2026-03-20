import glob

# 1. Update layout.tsx
layout_path = 'frontend/src/app/layout.tsx'
with open(layout_path, 'r', encoding='utf-8') as f:
    layout_code = f.read()

layout_code = layout_code.replace('min-h-screen"', 'min-h-screen flex flex-col"')
layout_code = layout_code.replace('{children}\n          <Footer />', '<div className="flex-1 flex flex-col">\n            {children}\n          </div>\n          <Footer />')

with open(layout_path, 'w', encoding='utf-8') as f:
    f.write(layout_code)

# 2. Update all page.tsx files
page_files = glob.glob('frontend/src/app/**/page.tsx', recursive=True)

for page in page_files:
    with open(page, 'r', encoding='utf-8') as f:
        code = f.read()
    
    code = code.replace('relative min-h-screen', 'relative flex-1 flex flex-col w-full')
    
    with open(page, 'w', encoding='utf-8') as f:
        f.write(code)

print("Updates applied")
