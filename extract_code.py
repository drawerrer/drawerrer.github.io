import json
import re
import os

source_file = "/Users/youngju/Downloads/물 링 던지기/물 링 던지기 게임 코드"
output_file = "/Users/youngju/Downloads/물 링 던지기/index.html"

def extract_code():
    try:
        with open(source_file, 'r', encoding='utf-8') as f:
            data = json.load(f)
        
        # Traverse the JSON to find the model's response containing the code
        # Based on the view_file output, it seems to be in data['chunkedPrompt']['chunks']
        # We look for a chunk with role 'model' that contains "```html"
        
        chunks = data.get('runSettings', {}).get('chunkedPrompt', {}).get('chunks', [])
        # Actually in the file viewing it looked like it was at the top level or nested.
        # Let's re-examine the file structure from view_file briefly.
        # It has "runSettings", "systemInstruction", "chunkedPrompt".
        # "chunkedPrompt" has "chunks".
        
        # If the file structure is exactly as shown in view_file:
        # The file starts with `{ "runSettings": ... }` if the numbering was just added by view_file.
        # But wait, the view_file output showed: 
        # 33:   "chunkedPrompt": {
        # 34:     "chunks": [{
        # so `data['chunkedPrompt']['chunks']` might be wrong if `chunkedPrompt` is not inside `runSettings`.
        # Looking at indentation:
        # 2: "runSettings": { ... }
        # 31: "systemInstruction": { ... }
        # 33: "chunkedPrompt": { ... }
        # So they are siblings at the root.
        
        chunks = data.get('chunkedPrompt', {}).get('chunks', [])
        
        target_text = ""
        for chunk in chunks:
            if chunk.get('role') == 'model':
                # Check for parts
                if 'parts' in chunk:
                    for part in chunk['parts']:
                        if 'text' in part:
                            text = part['text']
                            if "```html" in text:
                                target_text += text
                elif 'text' in chunk:
                    text = chunk['text']
                    if "```html" in text:
                        target_text = text # Assuming it's in one block or we overwrite? 
                        # But the view_file showed parts.
        
        # If we didn't find it in chunks, maybe the JSON structure is slightly different or scattered.
        # Let's try to just dump all text from model roles and regex search.
        
        full_text = ""
        for chunk in chunks:
            if chunk.get('role') == 'model':
                 if 'parts' in chunk:
                    for part in chunk['parts']:
                        if 'text' in part:
                            full_text += part['text']
                 elif 'text' in chunk:
                    full_text += chunk['text']
        
        # Regex to extract html code block
        match = re.search(r'```html(.*?)```', full_text, re.DOTALL)
        if match:
            html_code = match.group(1).strip()
            with open(output_file, 'w', encoding='utf-8') as f:
                f.write(html_code)
            print(f"Successfully extracted HTML to {output_file}")
        else:
            print("Could not find HTML code block in the file.")
            
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    extract_code()
