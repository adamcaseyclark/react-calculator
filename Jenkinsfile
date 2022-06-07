#!groovy​

PROJECT_NAME="react-calculator"
BRANCH_NAME="master"

node {
    stage('Git') {
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

    stage('Build') {
        sh "docker build -f docker/Dockerfile -t ${PROJECT_NAME}:${GIT_COMMIT} --build-arg BUILD_DATE=\"${BUILD_DATE}\" --build-arg GIT_HASH=${GIT_COMMIT} --force-rm=true --no-cache=true --pull=true --rm=true ."
    }
}

// pipeline {
//     agent any
//     environment {
//         BUILD_DATE = sh(script: 'date -u',returnStdout: true).trim()
//         BUILD_PREFIX = "${PROJECT_NAME}-${GIT_COMMIT}"
//         PROJECT_BUILD_NAME = "${PROJECT_NAME}-${env.BUILD_NUMBER}"
//
//         LIST_OF_FILES = sh(script: 'cd code && find ./cypress/integration/ -name "*.spec.js"', returnStdout: true)
//         TEST_FILES = sh(script: 'readFile("$LIST_OF_FILES").split().toList()', returnStdout: true)
//         // sh 'rm listOfFiles'
//         TEST_FILE_SPLIT_COUNT = sh(script: '$TEST_FILES.size().intdiv(5) + 1', returnStdout: true)
//         TEST_FILES_ARRAY = sh(script: '$TEST_FILES.collate($TEST_FILE_SPLIT_COUNT)', returnStdout: true)
//         PARALLEL_STAGES_MAP
//     }
//     stages {
//         stage('Git') {
//             steps {
//                 checkout([
//                     $class: 'GitSCM',
//                     branches: [
//                         [
//                             name: "master"
//                         ]
//                     ],
//                     doGenerateSubmoduleConfigurations: false,
//                     extensions: [],
//                     submoduleCfg: [],
//                     userRemoteConfigs: [
//                         [
//                             credentialsId: 'github-credentials',
//                             url: 'https://github.com/adamcaseyclark/react-calculator.git'
//                         ]
//                     ]
//                 ])
//
//                 sh "echo GIT_HASH is: ${GIT_COMMIT}"
//                 sh "echo BUILD_DATE is: ${BUILD_DATE}"
//                 sh "echo PROJECT_NAME is: ${PROJECT_NAME}"
//                 sh "echo BRANCH_NAME is: ${BRANCH_NAME}"
//                 sh "echo BUILD_NUMBER is: ${env.BUILD_NUMBER}"
//
//                 postBuildStatusToGithub("pending", "The build is pending!");
//             }
//         }
//
//         stage('Build') {
//             steps {
//                 sh "docker build -f docker/Dockerfile -t ${PROJECT_NAME}:${GIT_COMMIT} --build-arg BUILD_DATE=\"${BUILD_DATE}\" --build-arg GIT_HASH=${GIT_COMMIT} --force-rm=true --no-cache=true --pull=true --rm=true ."
//             }
//         }
//
// //         stage('Test') {
// //             steps {
// //                 sh "docker run ${PROJECT_NAME}:${GIT_COMMIT} test --offline"
// //                 postBuildStatusToGithub("success", "The build has passed!");
// //             }
// //         }
//
//         stage('UI Test') {
//             steps {
//
//
// //                 sh "echo ${docker ps}"
// //                 sh """
// //                     docker-compose -f docker/cypress-test.yml -p ${BUILD_PREFIX} up -d
// //                 """
//
//                 // build cypress container
//                 sh """
//                 docker build -f docker/CypressDockerfile -t $PROJECT_BUILD_NAME-cypress:${GIT_COMMIT} \
//                     --build-arg PROJECT_NAME=${PROJECT_NAME} \
//                     --build-arg GIT_HASH=${GIT_COMMIT} \
//                     --force-rm=true \
//                     --no-cache=true \
//                     .
//                 """
//
// //                 sh """
// //                     docker run \
// //                         --env CYPRESS_RUNNING_IN_DOCKER=true \
// //                         --name $PROJECT_BUILD_NAME-cypress-1 \
// //                         $PROJECT_BUILD_NAME-cypress:${GIT_COMMIT} run cypress:test
// //                 """
//
//                 // run cypress tests in parallel
// //                 sh 'cd code && find ./cypress/integration/ -name "*.spec.js" > ../listOfFiles'
// //                 def testFiles = readFile("listOfFiles").split().toList();
// //                 sh 'rm listOfFiles'
// //                 def testFileSplitCount = testFiles.size().intdiv(5) + 1;
// //                 def testFilesArray = testFiles.collate(testFileSplitCount);
//                 PARALLEL_STAGES_MAP = TEST_FILES_ARRAY.collectEntries {
//                     ["UI Test ${TEST_FILES_ARRAY.indexOf(it)}" : {
//                         node("${env.NODE_NAME}") {
//                             timeout(time: 5, activity: true, unit: 'MINUTES') {
//                                 sh """
//                                     docker run \
//                                         --env CYPRESS_RUNNING_IN_DOCKER=true \
//                                         --name $PROJECT_BUILD_NAME-cypress-${TEST_FILES_ARRAY.indexOf(it)} \
//                                         $PROJECT_BUILD_NAME-cypress:${GIT_COMMIT} run --spec '${it.join(',')}'
//                                 """
//                             }
//                         }
//                     }]
//                 }
//                 script {
//                     parallel PARALLEL_STAGES_MAP
//                 }
//                 postBuildStatusToGithub("success", "The build has passed!");
//             }
//         }
//     }
// }


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
