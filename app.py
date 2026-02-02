from flask import Flask, render_template, request, redirect, session, url_for
import mysql.connector

# STEP 1: App Setup (Fixed the NameError)
app = Flask(__name__)
app.secret_key = 'enspire_2026_secret_key' # Required for session persistence

# STEP 2: Database Connection Configuration
def get_db_connection():
    return mysql.connector.connect(
        host="your_oracle_ip",
        user="your_db_user",
        password="your_db_password",
        database="event_management"
    )

@app.route('/')
def home():
    # Show the homepage
    return render_template('Home.html')

@app.route('/register', methods=['POST'])
def register():
    # 1. Grab Common Fields
    email = request.form.get('userEmail')
    password = request.form.get('password')
    name = request.form.get('userName')
    student_type = request.form.get('collegeType')

    # 2. Extract conditional data based on form selection
    if student_type == 'internal':
        phone = request.form.get('phoneInt')
        branch = request.form.get('branchInt')
        year = request.form.get('yearInt')
        division = request.form.get('div')
        roll = request.form.get('roll')
        uid = request.form.get('sid')
        # Set external fields to None
        ext_college = ext_branch = ext_year = None
    else:
        phone = request.form.get('phoneExt')
        ext_college = request.form.get('extCollege')
        ext_branch = request.form.get('branchExt')
        ext_year = request.form.get('yearExt')
        # Set internal fields to None
        branch = year = division = roll = uid = None

    # 3. SQL Insert
    conn = get_db_connection()
    cursor = conn.cursor()
    
    query = """INSERT INTO attendees (
        email, password, full_name, student_type, 
        internal_branch, internal_year, internal_division, internal_roll, internal_uid,
        external_college, external_branch, external_year, phone
    ) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)"""
    
    values = (email, password, name, student_type, 
              branch, year, division, roll, uid,
              ext_college, ext_branch, ext_year, phone)

    try:
        cursor.execute(query, values)
        conn.commit()
        
        # 4. START SESSION (Auto-Login)
        session['user'] = email
        return redirect(url_for('home'))
        
    except mysql.connector.Error as err:
        return f"Error: {err}"
    finally:
        cursor.close()
        conn.close()

if __name__ == '__main__':
    app.run(debug=True)