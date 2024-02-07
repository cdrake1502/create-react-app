from openai import OpenAI
from dotenv import load_dotenv
import os 

load_dotenv()

open_api_key = os.getenv("OPENAI_API_KEY")
client = OpenAI(api_key=open_api_key)
"""               THIS IS AN EXAMPLE OF A PROMT THAT WILL TAKE YOUR NOTES AND GIVE YOU QUESTIONS          """

"""         These variables such as Question difficulty ,
             question types , number of questions and Whether to provide 
             answers should be input by the user
"""

Qnum = "5"
notes = """1. Waterfall:

Structure: Sequential phases (requirements, design, development, testing, deployment) completed one after another.
Strengths: Clear structure, easy project tracking, good for well-defined projects.
Weaknesses: Inflexible, changes require rework, not ideal for complex projects.
2. Agile:

Structure: Iterative and incremental development with short sprints (1-4 weeks).
Strengths: Adaptable to change, continuous feedback, high user involvement.
Weaknesses: Requires strong communication and collaboration, initial planning might be less detailed.
3. Scrum:

Structure: Agile framework using sprints, product backlog, daily stand-up meetings, and sprint reviews.
Strengths: Focuses on teamwork, prioritization, and continuous improvement.
Weaknesses: Requires trained Scrum Master, can be challenging for large teams.
4. Kanban:

Structure: Visual workflow management with cards representing tasks moving through different stages (e.g., backlog, in progress, done).
Strengths: Visualizes workflow, flexible and adaptable, good for continuous delivery.
Weaknesses: May lack detailed planning, requires strong process discipline.
5. DevOps:

Structure: Combines development and operations teams into a collaborative workflow.
Strengths: Improves communication, faster deployment, automated testing and configuration.
Weaknesses: Requires cultural change, integration challenges, might not be suitable for all projects.
Choosing the right methodology:

The best methodology depends on several factors, including:

Project size and complexity
Team size and skills
Project requirements and deadlines
Available resources and budget
It's important to understand the strengths and weaknesses of each method and choose the one that best fits your specific needs."""

response=client.completions.create(
    model="gpt-3.5-turbo-instruct",
    prompt="Give me" + Qnum +" questions of a medium difficulty with fill in the blank and multiple choice questions, these questions must have answers after each question. Based on this information:" + notes,
    max_tokens=250
)

print("Chat Response: ")

print(response.choices[0].text)