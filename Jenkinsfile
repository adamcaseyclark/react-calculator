#!groovy​

PROJECT_NAME="react-calculator"
BRANCH_NAME="master"
BUILD_URL=""

pipeline {
    agent any
    environment {
        BUILD_DATE = sh(script: 'date -u',returnStdout: true).trim()
    }
    stages {
        stage('Git') {
            steps {
                checkout([
                    $class: 'GitSCM',
                    branches: [
                        [
                            name: "master"
                        ]
                    ],
                    doGenerateSubmoduleConfigurations: false,
                    extensions: [],
                    submoduleCfg: [],
                    userRemoteConfigs: [
                        [
                            credentialsId: 'github-credentials',
                            url: 'https://github.com/adamcaseyclark/react-calculator.git'
                        ]
                    ]
                ])

                sh "echo GIT_HASH is: ${GIT_COMMIT}"
                sh "echo BUILD_DATE is: ${BUILD_DATE}"
                sh "echo PROJECT_NAME is: ${PROJECT_NAME}"
//                 sh "echo PROJECT_REGISTRY_URI is: ${PROJECT_REGISTRY_URI}"
                sh "echo BRANCH_NAME is: ${BRANCH_NAME}"
                sh "echo BUILD_NUMBER is: ${env.BUILD_NUMBER}"

                postBuildStatusToGithub("pending", "The build is pending!");
            }
        }

        stage('Build') {
            timestamps {
                sh "docker build -f docker/Dockerfile -t ${PROJECT_NAME}:${GIT_HASH} --build-arg BUILD_DATE=\"${BUILD_DATE}\" --build-arg GIT_HASH=${GIT_HASH} --force-rm=true --no-cache=true --pull=true --rm=true ."
            }
        }

    }
}

def postBuildStatusToGithub(state, description) {
    withCredentials([string(credentialsId: 'react-calculator-token', variable: 'TOKEN')]) {
        sh """
            curl -XPOST -H \"Authorization: token ${TOKEN}\" https://api.github.com/repos/adamcaseyclark/react-calculator/statuses/${GIT_COMMIT} -d \"{
            \\\"state\\\": \\\"${state}\\\",
            \\\"target_url\\\": \\\"${env.BUILD_URL}\\\",
            \\\"description\\\": \\\"${description}\\\"
            }\"
        """
    }
}

def getPreviousSuccess(build) {
    if (build != null) {
        if (build.result.toString() == 'SUCCESS') {
            return build
        }
        else {
            return getPreviousSuccess(build.getPreviousBuild())
        }
    }
    else {
        return null
    }
}

def getLastBuildHash(jobName) {
    def lastBuild = Jenkins.instance.getItemByFullName(jobName).lastBuild
    def lastSuccessfulBuild = getPreviousSuccess(lastBuild)
    def lastBuildScm = lastSuccessfulBuild?.actions.find { action -> action instanceof jenkins.scm.api.SCMRevisionAction }
    return lastBuildScm?.revision?.hash
}
