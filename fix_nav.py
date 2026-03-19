import os

app_dir = "frontend/src/app"
mobile_menu_import = 'import { MobileMenu } from "@/components/MobileMenu";\n'

count = 0

for root, dirs, files in os.walk(app_dir):
    for f in files:
        if f.endswith(".tsx"):
            filepath = os.path.join(root, f)
            with open(filepath, "r", encoding="utf-8") as file:
                content = file.read()
            
            if "<nav " not in content:
                continue
                
            original_content = content
            
            if "MobileMenu" not in content:
                imports_end = content.rfind("import ")
                if imports_end != -1:
                    newline_after_import = content.find("\n", imports_end)
                    content = content[:newline_after_import+1] + mobile_menu_import + content[newline_after_import+1:]
                else:
                    content = mobile_menu_import + content
            
            content = content.replace("hidden md:flex items-center gap-8", "hidden lg:flex items-center gap-6")
            content = content.replace("hidden md:flex items-center gap-6", "hidden lg:flex items-center gap-6")
            content = content.replace("hidden md:flex relative", "hidden lg:flex relative")
            
            nav_start = content.find("<nav")
            nav_end = content.find("</nav>", nav_start)
            
            if nav_start != -1 and nav_end != -1:
                nav_content = content[nav_start:nav_end]
                
                if '<div className="flex items-center gap-4">' in nav_content and "<MobileMenu />" not in nav_content:
                    new_nav_content = nav_content.replace(
                        '<div className="flex items-center gap-4">',
                        '<div className="flex items-center gap-4">\n            <MobileMenu />',
                        1
                    )
                    content = content[:nav_start] + new_nav_content + content[nav_end:]

            if original_content != content:
                with open(filepath, "w", encoding="utf-8") as file:
                    file.write(content)
                print(f"Updated {filepath}")
                count += 1

print(f"Total files updated: {count}")
