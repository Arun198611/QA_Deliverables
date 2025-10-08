pipeline {
    agent any

    environment {
        CI = 'true'
        CYPRESS_CACHE_FOLDER = "C:\\Users\\aruns\\AppData\\Local\\Cypress\\Cache"
        NODE_HOME = "C:\\Program Files\\nodejs" // your NodeJS installation path
        PATH = "${env.NODE_HOME};C:\\Users\\aruns\\AppData\\Local\\Cypress\\Cache\\15.2.0\\Cypress;%PATH%"
    }

    tools {
        nodejs "NodeJS" // must match the NodeJS tool configured in Jenkins
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
                echo 'Checking environment variables...'
                bat "\"${env.NODE_HOME}\\node.exe\" --version"
                bat "\"${env.NODE_HOME}\\npm.cmd\" --version"
                bat "dir \"${env.CYPRESS_CACHE_FOLDER}\""
                bat "dir \"${env.CYPRESS_CACHE_FOLDER}\\15.2.0\\Cypress\""
            }
        }

        stage('Install Dependencies') {
            steps {
                bat "\"${env.NODE_HOME}\\npm.cmd\" install"
            }
        }

        stage('Ensure Cypress Installed') {
            steps {
                bat "\"${env.NODE_HOME}\\npx.cmd\" cypress verify"
            }
        }

        stage('Run Cypress Tests - Headless') {
            steps {
                bat "\"${env.NODE_HOME}\\npx.cmd\" cypress run --browser chrome"
            }
        }

        stage('Run Cypress Tests - GUI (Optional)') {
            steps {
                input message: "Run Cypress in GUI mode?"
                bat "\"${env.NODE_HOME}\\npx.cmd\" cypress open"
            }
        }

        stage('Generate Mochawesome Report') {
            steps {
                bat "\"${env.NODE_HOME}\\npx.cmd\" mochawesome-merge cypress\\reports\\*.json > mochawesome.json"
                bat "\"${env.NODE_HOME}\\npx.cmd\" marge mochawesome.json --reportDir cypress\\reports\\html"
            }
        }
    }

    post {
        always {
            archiveArtifacts artifacts: 'cypress/reports/html/**/*', allowEmptyArchive: true
        }
        failure {
            echo '❌ Tests failed! Check the HTML report for details.'
        }
        success {
            echo '✅ All tests passed successfully!'
        }
    }
}
