pipeline {
    agent any

    environment {
        CI = 'true'
        NODE_PATH = "C:\\Program Files\\nodejs"
        CYPRESS_BIN = "C:\\Users\\aruns\\AppData\\Local\\Cypress\\Cache\\15.2.0\\Cypress\\Cypress.exe"
        CYPRESS_CACHE_FOLDER = "C:\\Users\\aruns\\AppData\\Local\\Cypress\\Cache"
    }

    stages {

        stage('Clean Workspace') {
            steps {
                echo 'Cleaning workspace...'
                deleteDir()
            }
        }

        stage('Checkout Code') {
            steps {
                git branch: 'development', url: 'https://github.com/Arun198611/QA_Deliverables.git'
            }
        }

        stage('Check Environment') {
            steps {
                echo 'Checking environment...'
                bat "\"${env.NODE_PATH}\\node.exe\" --version"
                bat "\"${env.NODE_PATH}\\npm.cmd\" --version"
                bat "dir \"${env.CYPRESS_CACHE_FOLDER}\""
                bat "dir \"${env.CYPRESS_BIN}\""
            }
        }

        stage('Install Dependencies') {
            steps {
                bat "\"${env.NODE_PATH}\\npm.cmd\" install"
            }
        }

        stage('Ensure Cypress Installed') {
            steps {
                bat "\"${env.NODE_PATH}\\npx.cmd\" cypress verify"
            }
        }

        stage('Run Cypress Tests - Headless') {
            steps {
                bat "\"${env.NODE_PATH}\\npx.cmd\" cypress run --browser chrome"
            }
        }

        stage('Run Cypress Tests - GUI (Optional)') {
            steps {
                input message: "Run Cypress GUI?"
                bat "\"${env.CYPRESS_BIN}\""
            }
        }

        stage('Generate Mochawesome Report') {
            steps {
                bat "\"${env.NODE_PATH}\\npx.cmd\" mochawesome-merge cypress\\reports\\*.json > mochawesome.json"
                bat "\"${env.NODE_PATH}\\npx.cmd\" marge mochawesome.json --reportDir cypress\\reports\\html"
            }
        }
    }

    post {
        always {
            archiveArtifacts artifacts: 'cypress/reports/html/**/*', allowEmptyArchive: true
        }
        failure {
            echo '❌ Tests failed! Check the HTML report.'
        }
        success {
            echo '✅ Tests passed successfully!'
        }
    }
}
