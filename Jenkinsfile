#!groovy​

PROJECT_NAME="react-calculator"
BRANCH_NAME="master"
GIT_HASH=""

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

        GIT_HASH = sh(script: 'git rev-parse HEAD',returnStdout: true).trim()
        BUILD_DATE = sh(script: 'date -u',returnStdout: true).trim()

        sh "echo GIT_HASH is: ${GIT_HASH}"
        sh "echo BUILD_DATE is: ${BUILD_DATE}"
        sh "echo PROJECT_NAME is: ${PROJECT_NAME}"
        sh "echo BRANCH_NAME is: ${BRANCH_NAME}"
        sh "echo BUILD_NUMBER is: ${BUILD_NUMBER}"

        postBuildStatusToGithub("pending", "The build is pending!");

        sh(script: 'docker stop $(docker ps -aq)', returnStdout: true)

        // sh(script: 'docker rm 269c7544b7b6', returnStdout: true)
        // sh(script: 'docker rm 6bed874b29cf', returnStdout: true)
        sh(script: 'docker rm 907ccb5b3241', returnStdout: true)
        sh(script: 'docker rm cab2ebe16df7', returnStdout: true)
        sh(script: 'docker rm eae92e4a0a2c', returnStdout: true)
        sh(script: 'docker rm 07da4567e2e4', returnStdout: true)
        sh(script: 'docker rm 2cdd3c2435fe', returnStdout: true)
        sh(script: 'docker rm 6b518c13a941', returnStdout: true)
        sh(script: 'docker rm bf6bea599498', returnStdout: true)
        sh(script: 'docker rm 4cc0b41cf061', returnStdout: true)
        sh(script: 'docker rm 1b96ea4ca4db', returnStdout: true)
        sh(script: 'docker rm 2366dc17dafe', returnStdout: true)
        sh(script: 'docker rm 7f043bb4dcd2', returnStdout: true)
        sh(script: 'docker rm 2c3fb71f984e', returnStdout: true)
        sh(script: 'docker rm 9d01ff8206e6', returnStdout: true)
        sh(script: 'docker rm 4722c6ab8cd6', returnStdout: true)
        sh(script: 'docker rm 8c879f0e4c16', returnStdout: true)
        sh(script: 'docker rm 38c19ab126d2', returnStdout: true)
        sh(script: 'docker rm 80e838917130', returnStdout: true)
        sh(script: 'docker rm 57994fe16dd7', returnStdout: true)

        // sh(script: 'docker stop $(docker ps -aq)', returnStdout: true)
        // sh(script: 'docker rm $(docker ps -aq)', returnStdout: true)
        // sh(script: 'docker rmi $(docker ps -aq)', returnStdout: true)
    }

//     stage('Build') {
//         sh "docker build -f docker/Dockerfile -t ${PROJECT_NAME}:${GIT_HASH} --build-arg BUILD_DATE=\"${BUILD_DATE}\" --build-arg GIT_HASH=${GIT_HASH} --force-rm=true --no-cache=true --pull=true --rm=true ."
//     }
//
//     stage('Test') {
//         timestamps {
//             try {
//                 sh('echo SKIPPING TEST BLOCK CURRENTLY.....')
//                 // sh "docker run ${PROJECT_NAME}:${GIT_HASH} test --offline"
//                 // postBuildStatusToGithub("success", "The build has passed!");
//             }
//             catch (error) {
//                 postBuildStatusToGithub("failure", "The build has failed!");
//                 throw error
//             }
//         }
//     }
//
//     try {
//         stage('UI Tests') {
//             timestamps {
//                 try {
//                     random = new Random()
//                     portForCalculator = Math.abs(random.nextInt(65535 - 49152) + 1) + 49152
//
//                     BUILD_PREFIX = "${PROJECT_NAME}-${GIT_HASH}"
//                     PROJECT_BUILD_NAME = "${PROJECT_NAME}-${BUILD_NUMBER}"
//
//                     sh(script: 'docker stop $(docker ps -aq)', returnStdout: true)
//                     sh(script: 'docker rm $(docker ps -aq)', returnStdout: true)
//                     sh(script: 'docker rmi $(docker ps -aq)', returnStdout: true)
//
//                     sh "docker run ${PROJECT_NAME}:${GIT_HASH}"
//
//                     // build cypress container
//                     sh """
//                     docker build -f docker/CypressDockerfile -t ${PROJECT_BUILD_NAME}-cypress:${GIT_HASH} \
//                         --build-arg PROJECT_NAME=${PROJECT_NAME} \
//                         --build-arg GIT_HASH=${GIT_HASH} \
//                         --force-rm=true \
//                         --no-cache=true \
//                         .
//                     """
//
//                     timeout(3) {
//                         waitUntil {
//                             script {
//                                 def localhost3000IsNowRunning = sh(
//                                     script: "wget -q http://localhost:3000 -O /dev/null",
//                                     returnStatus: true
//                                 )
//                                 return (localhost3000IsNowRunning == 0);
//                             }
//                         }
//                     }
//
//                     // run cypress tests in parallel
//                     sh 'cd code && find ./cypress/integration/ -name "*.spec.js" > ../listOfFiles'
//                     def testFiles = readFile("listOfFiles").split().toList();
//                     sh 'rm listOfFiles'
//                     def testFileSplitCount = testFiles.size().intdiv(5) + 1;
//                     def testFilesArray = testFiles.collate(testFileSplitCount);
//                     def parallelStagesMap = testFilesArray.collectEntries {
//                         ["UI Test ${testFilesArray.indexOf(it)}" : {
//                             node("${env.NODE_NAME}") {
//                                 timeout(time: 5, activity: true, unit: 'MINUTES') {
//                                     sh """
//                                         docker run \
//                                             --env CYPRESS_RUNNING_IN_DOCKER=true \
//                                             --name ${PROJECT_BUILD_NAME}-cypress-${testFilesArray.indexOf(it)} \
//                                             ${PROJECT_BUILD_NAME}-cypress:${GIT_HASH} run --spec '${it.join(',')}'
//                                     """
//                                 }
//                             }
//                         }]
//                     }
//                     script {
//                         parallel parallelStagesMap
//                     }
//                     postBuildStatusToGithub("success", "The build has passed!");
//                 }
//                 catch (error) {
//                     postBuildStatusToGithub("failure", "The build has failed!");
//                     throw error
//                 }
//                 finally {
//                     0.upto(4, {
//                         sh "docker rm --force ${PROJECT_BUILD_NAME}-cypress-${it}"
//                     })
//
//                     sh "docker rmi ${PROJECT_NAME}:${GIT_HASH}"
//                     sh "docker rmi ${PROJECT_BUILD_NAME}-cypress:${GIT_HASH}"
//                 }
//             }
//         }
//     }
//     catch (error) {
//         // throw error // non-blocking but should still show a failed stage
//     }
}

def postBuildStatusToGithub(state, description) {
    withCredentials([string(credentialsId: 'react-calculator-token', variable: 'TOKEN')]) {
        sh """
            curl -XPOST -H \"Authorization: token ${TOKEN}\" https://api.github.com/repos/adamcaseyclark/react-calculator/statuses/${GIT_HASH} -d \"{
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
