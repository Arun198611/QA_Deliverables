pipeline {
    agent any

    environment {
        // Absolute paths to Node, NPM, NPX
        NODE_PATH = "C:\\Program Files\\nodejs"
        NPM_CMD   = "C:\\Program Files\\nodejs\\npm.cmd"
        NPX_CMD   = "C:\\Program Files\\nodejs\\npx.cmd"
        
        // Prepend PowerShell folder to PATH for Windows service
        PATH = "C:\\Windows\\System32\\WindowsPowerShell\\v1.0;${env.NODE_PATH};${env.PATH}"
        
        // Cypress cache folder (adjust user folder if needed)
        CYPRESS_CACHE_FOLDER = "C:\\Users\\aruns\\AppData\\Local\\Cypress\\Cache"
    }

    stages {

        stage('Clean Workspace') {
            steps {
                echo "Cleaning workspace..."
                deleteDir()
            }
        }

        stage('Checkout Code') {
            steps {
                echo "Checking out source code..."
                checkout scm
            }
        }

        stage('Check Environment') {
            steps {
                echo "Checking environment variables and paths..."
                bat """
                "${env.NODE_PATH}\\node.exe" --version
                "${env.NPM_CMD}" --version
                dir "${env.CYPRESS_CACHE_FOLDER}"
                """
            }
        }

        stage('Install Dependencies') {
            steps {
                echo "Installing npm dependencies..."
                bat "\"${env.NPM_CMD}\" install"
            }
        }

        stage('Ensure Cypress Installed') {
            steps {
                echo "Verifying Cypress installation..."
                bat "\"${env.NPX_CMD}\" cypress verify"
            }
        }

        stage('Run Cypress Tests - Headless') {
            steps {
                echo "Running Cypress tests in headless mode..."
                bat "\"${env.NPX_CMD}\" cypress run --browser chrome"
            }
        }

        stage('Run Cypress Tests - GUI (Optional)') {
            when {
                expression { return params.RUN_GUI == true }
            }
            steps {
                echo "Running Cypress in GUI mode (optional)..."
                bat "\"${env.NPX_CMD}\" cypress open"
            }
        }

        stage('Generate Mochawesome Report') {
            steps {
                echo "Generating Mochawesome report..."
                // Adjust your report generation command if needed
             //   bat "\"${env.NPX_CMD}\" mochawesome-merge cypress/results/*.json > mochawesome.json"
             //   bat "\"${env.NPX_CMD}\" marge mochawesome.json -f report -o cypress/results"
            }
        }
    }

    post {
        always {
            archiveArtifacts artifacts: 'cypress/results/**/*.*', allowEmptyArchive: true
            echo "Pipeline finished. Check reports for details."
        }
    }
}
