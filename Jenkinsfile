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
                sh "echo BRANCH_NAME is: ${BRANCH_NAME}"
                sh "echo BUILD_NUMBER is: ${env.BUILD_NUMBER}"

                postBuildStatusToGithub("pending", "The build is pending!");
            }
        }

        stage('Build') {
            steps {
                sh "docker build -f docker/Dockerfile -t ${PROJECT_NAME}:${GIT_COMMIT} --build-arg BUILD_DATE=\"${BUILD_DATE}\" --build-arg GIT_HASH=${GIT_COMMIT} --force-rm=true --no-cache=true --pull=true --rm=true ."
            }
        }

        stage('Test') {
            steps {
                try {
                    sh "echo Running Test Block - Currently Commented Out"
                    // sh "docker run ${PROJECT_NAME}:${GIT_COMMIT} test --offline"
                    // postBuildStatusToGithub("success", "The build has passed!");
                }
                catch (error) {
                    postBuildStatusToGithub("failure", "The build has failed!");
                    throw error
                }
            }
        }

        try {
            stage('UI Test') {
                steps {
                    try {
                        BUILD_PREFIX = "${PROJECT_NAME}-${GIT_COMMIT}"

                        // sh """
                            // docker-compose -f docker/cypress-test.yml -p ${BUILD_PREFIX} up -d
                        // """

                        PROJECT_BUILD_NAME = "${PROJECT_NAME}-${BUILD_NUMBER}"

                        // build cypress container
                        sh """
                        docker build -f docker/CypressDockerfile -t ${PROJECT_BUILD_NAME}-cypress:${GIT_COMMIT} \
                            --build-arg PROJECT_NAME=${PROJECT_NAME} \
                            --build-arg GIT_HASH=${GIT_COMMIT} \
                            --force-rm=true \
                            --no-cache=true \
                            .
                        """

                        // run cypress tests in parallel
                        sh 'cd code && find ./cypress/integration/ -name "*.spec.js" > ../listOfFiles'
                        def testFiles = readFile("listOfFiles").split().toList();
                        sh 'rm listOfFiles'
                        def testFileSplitCount = testFiles.size().intdiv(5) + 1;
                        def testFilesArray = testFiles.collate(testFileSplitCount);
                        def parallelStagesMap = testFilesArray.collectEntries {
                            ["UI Test ${testFilesArray.indexOf(it)}" : {
                                node("${env.NODE_NAME}") {
                                    timeout(time: 5, activity: true, unit: 'MINUTES') {
                                        sh """
                                            docker run --network=${BUILD_PREFIX}-cypressnet \
                                                --env CYPRESS_RUNNING_IN_DOCKER=true \
                                                --name ${PROJECT_BUILD_NAME}-cypress-${testFilesArray.indexOf(it)} \
                                                ${PROJECT_BUILD_NAME}-cypress:${GIT_COMMIT} run --spec '${it.join(',')}'
                                        """
                                    }
                                }
                            }]
                        }
                            script {
                                parallel parallelStagesMap
                            }
                            postBuildStatusToGithub("success", "The build has passed!");
                        }
                        catch (error) {
                            postBuildStatusToGithub("failure", "The build has failed!");
                            throw error
                        }
//                                 finally {
//                                     0.upto(4, {
//                                         sh "docker rm --force ${PROJECT_BUILD_NAME}-cypress-${it}"
//                                     })
//                                     withCredentials([
//                                         [
//                                             $class: 'AmazonWebServicesCredentialsBinding',
//                                             credentialsId: 'devops-jenkins'
//                                         ]
//                                     ]) {
//                                         sh """
//                                         WORKFLOWS_HASH=${lastSuccessfulWorkflowsHash} WORKFLOWS_PORT=${workflowsPort} \
//                                             WORKBENCH_HASH=${GIT_HASH} WORKBENCH_PORT=${workbenchPort} \
//                                             ATTACHMENTS_HASH=${lastSuccessfulAttachmentsHash} ATTACHMENTS_PORT=${attachmentsPort} \
//                                             docker-compose -f docker/cypress-test.yml -p ${PROJECT_NAME}:${GIT_HASH} down -v
//                                         """
//                                     }
//                                     sh "docker rmi ${PROJECT_BUILD_NAME}-cypress:${GIT_HASH}"
//                                 }
                            }
                        }
                    }
                }
                catch (error) {
                    // throw error // non-blocking but should still show a failed stage
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
