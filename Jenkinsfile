pipeline {
    agent any

    environment {
        CI = 'true'
        CYPRESS_CACHE_FOLDER = "C:\\Users\\aruns\\AppData\\Local\\Cypress\\Cache"
        PATH = "C:\\Windows\\System32;C:\\Program Files\\nodejs;C:\\Users\\aruns\\AppData\\Local\\Cypress\\Cache\\15.2.0\\Cypress;%PATH%"
    }

    tools {
        nodejs "NodeJS"
    }

    stages {

        stage('Clean Workspace') {
            steps {
                bat 'C:\\Windows\\System32\\cmd.exe /c rmdir /s /q "%WORKSPACE%" && mkdir "%WORKSPACE%"'
            }
        }

        stage('Checkout Code') {
            steps {
                git branch: 'development', url: 'https://github.com/Arun198611/QA_Deliverables.git'
            }
        }

        stage('Check Environment') {
            steps {
                bat '''
                C:\\Windows\\System32\\cmd.exe /c echo --- Checking Environment Variables ---
                C:\\Windows\\System32\\cmd.exe /c echo CI=%CI%
                C:\\Windows\\System32\\cmd.exe /c echo Cypress Cache Folder: %CYPRESS_CACHE_FOLDER%
                C:\\Windows\\System32\\where.exe node
                C:\\Windows\\System32\\where.exe npm
                C:\\Windows\\System32\\cmd.exe /c dir "%CYPRESS_CACHE_FOLDER%"
                C:\\Windows\\System32\\cmd.exe /c dir "C:\\Users\\aruns\\AppData\\Local\\Cypress\\Cache\\15.2.0\\Cypress"
                '''
            }
        }

        stage('Install Dependencies') {
            steps {
                bat 'C:\\Program Files\\nodejs\\npm.cmd install'
            }
        }

        stage('Ensure Cypress Installed') {
            steps {
                bat 'C:\\Program Files\\nodejs\\npx.cmd cypress verify'
            }
        }

        stage('Run Cypress Tests - Headless') {
            steps {
                bat 'C:\\Program Files\\nodejs\\npx.cmd cypress run --browser chrome'
            }
        }

        stage('Run Cypress Tests - GUI (Optional)') {
            when {
                expression { return params.RUN_GUI == true }
            }
            steps {
                bat 'C:\\Program Files\\nodejs\\npx.cmd cypress open'
            }
        }

        stage('Generate Mochawesome Report') {
            steps {
                bat 'C:\\Program Files\\nodejs\\npx.cmd mochawesome-merge cypress/reports/*.json > mochawesome.json'
                bat 'C:\\Program Files\\nodejs\\npx.cmd marge mochawesome.json --reportDir cypress/reports/html'
            }
        }
    }

    parameters {
        booleanParam(name: 'RUN_GUI', defaultValue: false, description: 'Run Cypress in GUI mode for debugging')
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
