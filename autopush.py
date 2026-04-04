import os
import sys
import subprocess
import time
from datetime import datetime

def run_command(command):
    try:
        result = subprocess.run(command, check=True, text=True, shell=True, capture_output=True)
        print(result.stdout)
    except subprocess.CalledProcessError as e:
        print(f"Error executing '{command}':\n{e.stderr}")
        sys.exit(1)

def auto_push(commit_message=None):
    if not commit_message:
        commit_message = f"Auto-commit: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}"
    
    print(f"[{datetime.now().strftime('%H:%M:%S')}] Started Auto-Push")
    
    print("1. Staging all files (git add .)...")
    run_command("git add .")
    
    print(f"2. Committing changes (git commit -m '{commit_message}')...")
    # Using subprocess.run directly for commit to avoid failing if there are no changes
    result = subprocess.run(f'git commit -m "{commit_message}"', shell=True, capture_output=True, text=True)
    if "nothing to commit" in result.stdout or "nothing to commit" in result.stderr:
        print("No changes to commit.")
        return
    else:
        print(result.stdout)
        
    print("3. Pushing to remote (git push)...")
    run_command("git push")
    
    print(f"[{datetime.now().strftime('%H:%M:%S')}] Auto-Push Completed Successfully!")

if __name__ == "__main__":
    msg = sys.argv[1] if len(sys.argv) > 1 else None
    auto_push(msg)
