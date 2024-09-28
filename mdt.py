#!/usr/bin/env python3
import subprocess
import sys
import argparse

def run_docker_command(command):
    """Run a Docker command and print the output."""
    try:
        result = subprocess.run(command, shell=True, check=True, text=True, capture_output=True)
        print(result.stdout)
    except subprocess.CalledProcessError as e:
        print(f"Error running command: {e.stderr}")
        sys.exit(1)

def logs(service_name):
    """Show logs for the specified Docker service."""
    command = f"docker logs -f {service_name}"
    run_docker_command(command)

def run_service(service_name, port=None):
    """Run the specified Docker service with optional port mapping."""
    if port:
        command = f"docker run -it -p {port}:{port} {service_name}"
    else:
        command = f"docker run -it {service_name}"
    run_docker_command(command)

def clean(option):
    """Clean Docker images or prune everything."""
    if option == 'image':
        command = "docker image prune -f"
    elif option == 'everything':
        command = "docker system prune -f"
    else:
        print("Invalid clean option. Use 'image' or 'everything'.")
        sys.exit(1)
    run_docker_command(command)

def populate_db():
    """Populate the MongoDB database with initial data."""
    command = "docker exec -i urban-eats-server mongo < /app/db/initData.js"
    run_docker_command(command)

def destroy_db():
    """Drop the MongoDB database."""
    command = "docker exec -i mongo mongo urban-eats --eval 'db.dropDatabase()'"
    run_docker_command(command)

def main():
    parser = argparse.ArgumentParser(description='MDT: A Docker and DB management tool.')

    subparsers = parser.add_subparsers(dest='command')

    logs_parser = subparsers.add_parser('logs', help='Show logs for a service')
    logs_parser.add_argument('service_name', type=str, help='The name of the service to show logs for')

    run_parser = subparsers.add_parser('run', help='Run a Docker service')
    run_parser.add_argument('service_name', type=str, help='The name of the service to run')
    run_parser.add_argument('-p', '--port', type=str, help='The port to bind (e.g. 80:8000)', required=False)

    clean_parser = subparsers.add_parser('clean', help='Clean Docker resources')
    clean_parser.add_argument('option', choices=['image', 'everything'], help="Choose 'image' to prune images or 'everything' to prune the system")

    subparsers.add_parser('populate_db', help='Populate the database with initial data')

    subparsers.add_parser('destroy_db', help='Destroy the MongoDB database')

    args = parser.parse_args()

    if args.command == 'logs':
        logs(args.service_name)
    elif args.command == 'run':
        run_service(args.service_name, args.port)
    elif args.command == 'clean':
        clean(args.option)
    elif args.command == 'populate_db':
        populate_db()
    elif args.command == 'destroy_db':
        destroy_db()
    else:
        parser.print_help()

if __name__ == "__main__":
    main()
