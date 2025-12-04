pipeline {
    agent any

    environment {
        NODE_PATH       = "C:\\Program Files\\nodejs"
        NPM_GLOBAL_BIN  = "C:\\Users\\aruns\\AppData\\Roaming\\npm"
        NPM_CMD         = "${NODE_PATH}\\npm.cmd"
        NPX_CMD         = "${NODE_PATH}\\npx.cmd"
        CYPRESS_CACHE_FOLDER = "C:\\CypressCache"

        PATH = "${NPM_GLOBAL_BIN};${NODE_PATH};${env.PATH}"
    }

    parameters {
        booleanParam(name: 'RUN_GUI', defaultValue: false, description: 'Run Cypress in GUI mode')
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
                "${NODE_PATH}\\node.exe" --version
                "${NPM_CMD}" --version
                if not exist "${CYPRESS_CACHE_FOLDER}" mkdir "${CYPRESS_CACHE_FOLDER}"
                dir "${CYPRESS_CACHE_FOLDER}"
                """
            }
        }

        stage('Install Dependencies') {
            steps {
                echo "Installing npm dependencies..."
                bat "\"${NPM_CMD}\" install"
            }
        }

        stage('Ensure Cypress Installed') {
            steps {
                echo "Verifying and installing Cypress binary..."
                bat """
                set CYPRESS_CACHE_FOLDER=${CYPRESS_CACHE_FOLDER}
                "${NPX_CMD}" cypress install
                "${NPX_CMD}" cypress verify
                """
            }
        }

        stage('Run Cypress Tests - Headless') {
            steps {
                echo "Running Cypress tests in headless mode..."
                bat """
                set CYPRESS_CACHE_FOLDER=${CYPRESS_CACHE_FOLDER}
                "${NPX_CMD}" cypress run --browser chrome
                """
            }
        }

        stage('Run Cypress Tests - GUI (Optional)') {
            when {
                expression { return params.RUN_GUI }
            }
            steps {
                echo "Running Cypress in GUI mode..."
                bat """
                set CYPRESS_CACHE_FOLDER=${CYPRESS_CACHE_FOLDER}
                "${NPX_CMD}" cypress open
                """
            }
        }

        stage('Run Postman Tests') {
            steps {
                catchError(buildResult: 'FAILURE', stageResult: 'FAILURE') {
                    echo "Running Postman API tests using Newman..."

                    bat "\"${NPM_CMD}\" install -g newman"

                    bat 'if not exist newman mkdir newman'

                    bat """
                    "${NPM_GLOBAL_BIN}\\newman.cmd" run "Postman/Collections_v2.json" ^
                        -r cli,junit ^
                        --reporter-junit-export newman/newman-report.xml
                    """
                }
            }
        }

        stage('Generate Mochawesome Report') {
            steps {
                echo "Generating Mochawesome report..."
            }
        }
    }

    post {
        always {
            echo "Archiving Newman Reports..."
            archiveArtifacts artifacts: 'newman/*.xml', fingerprint: true
            junit 'newman/*.xml'
        }
    }
}
